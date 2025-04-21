import { NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import { User } from "@/models/Users";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export async function POST(req: Request) {
  try {
    await connectMongo();
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return NextResponse.json({ message: "Failed to connect to MongoDB" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const accessTokenPayload = {
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: Array.isArray(user.roles) ? user.roles.map((r: { toString: () => any; }) => r.toString()) : [],
      isVerified: !!user.isVerified
    };

    const refreshTokenPayload = {
      id: user._id.toString()
    };

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY ?? "15m";
    const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY ?? "7d";
    const refreshTokenMaxAge = 60 * 60 * 24 * 7;

    if (!accessSecret || !refreshSecret) {
      console.error("JWT access or refresh secret environment variable is not set.");
      return NextResponse.json({ message: "Internal server error: JWT configuration missing" }, { status: 500 });
    }

    const getExpiryInSeconds = (expiryString: string) => {
      const unit = expiryString.slice(-1);
      const value = parseInt(expiryString.slice(0, -1));
      
      switch(unit) {
        case "m": return value * 60;
        case "h": return value * 60 * 60;
        case "d": return value * 60 * 60 * 24;
        default: return 900;
      }
    };

    const accessExpiryInSeconds = getExpiryInSeconds(accessTokenExpiry);
    const refreshExpiryInSeconds = getExpiryInSeconds(refreshTokenExpiry);

    const accessToken = await new jose.SignJWT(accessTokenPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + accessExpiryInSeconds)
      .sign(new TextEncoder().encode(accessSecret));

    const refreshToken = await new jose.SignJWT(refreshTokenPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + refreshExpiryInSeconds)
      .sign(new TextEncoder().encode(refreshSecret));

    interface SigninResponseUser {
      id: string
      email: string
      roles: string[]
    }

    interface SigninResponseBody {
      message: string
      accessToken: string
      user: SigninResponseUser
    }

    const response: NextResponse<SigninResponseBody> = NextResponse.json({
      message: "Signin successful",
      accessToken,
      user: { 
        id: user._id.toString(), 
        email: user.email, 
        roles: Array.isArray(user.roles) ? user.roles.map((r: { toString: () => string }) => r.toString()) : [] 
      }
    }, { status: 200 });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshTokenMaxAge,
      path: "/"
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshTokenMaxAge,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || "An unexpected error occurred during signin" }, { status: 500 });
    }
    return NextResponse.json({ message: "An unexpected error occurred during signin" }, { status: 500 });
  }
}