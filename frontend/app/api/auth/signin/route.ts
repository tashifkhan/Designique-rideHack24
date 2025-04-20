import { NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import { User } from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    // if (!user.isVerified) {
    //   return NextResponse.json({ message: "Email not verified. Please check your inbox." }, { status: 403 });
    // }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const accessTokenPayload = {
      id: user._id,
      email: user.email,
      roles: user.roles,
      isVerified: user.isVerified
    };

    const refreshTokenPayload = {
      id: user._id
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

    const accessToken = jwt.sign(accessTokenPayload, accessSecret, {
      expiresIn: accessTokenExpiry
    });

    const refreshToken = jwt.sign(refreshTokenPayload, refreshSecret, {
      expiresIn: refreshTokenExpiry
    });

    const response = NextResponse.json({
      message: "Signin successful",
      accessToken,
      user: { id: user._id, email: user.email, roles: user.roles }
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
    })

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || "An unexpected error occurred during signin" }, { status: 500 });
    }
    return NextResponse.json({ message: "An unexpected error occurred during signin" }, { status: 500 });
  }
}