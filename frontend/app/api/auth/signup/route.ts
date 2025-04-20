import { NextResponse } from "next/server"
import connectMongo from "@/lib/db/connectMongo"
import { User } from "@/models/Users"
import { UserRoles } from "@/lib/constants/userRoles"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST (req: Request) {
  try {
    await connectMongo()
  } catch (error) {
    console.error("Error connecting to MongoDB", error)
    return NextResponse.json({ message: "Failed to connect to database" }, { status: 500 })
  }

  try {
    const body = await req.json()
    const { email, password, roles } = body

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    if (typeof password !== "string" || password.length < 6) { 
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    let validatedRoles = [UserRoles.USER]
    if (roles) {
      if (!Array.isArray(roles) || !roles.every(role => Object.values(UserRoles).includes(role))) {
        return NextResponse.json({ message: "Invalid roles provided" }, { status: 400 })
      }
    
      validatedRoles = roles.includes(UserRoles.USER) ? roles : Array.from(new Set([...roles, UserRoles.USER]))
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      if (!existingUser.isVerified) {
      existingUser.password = await bcrypt.hash(password, await bcrypt.genSalt(10))
      existingUser.roles = validatedRoles
      existingUser.token = Array.from(
        { length: 16 },
        () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]
      ).join("")
      await existingUser.save()
      try {
        await sendVerificationEmail(existingUser.email, existingUser.token, existingUser._id.toString())
      } catch (emailError) {
        console.error("Error sending verification email:", emailError)
      }
      return NextResponse.json({
        message: "Account exists but was not verified. We've updated your info and resent the verification email.",
        user: {
        id: existingUser._id,
        email: existingUser.email,
        roles: existingUser.roles,
        token: existingUser.token
        }
      }, { status: 200 })
      }
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 }) 
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const token = Array.from(
      { length: 16 },
      () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]
    ).join("")

    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      roles: validatedRoles,
      isVerified: false,
      token,
      
      // Common fields
      firstname: body.firstname || "",
      lastname: body.lastname || "",
      
      // Designer fields (only populated if the user has a DESIGNER role)
      ...(validatedRoles.includes(UserRoles.DESIGNER) && {
        specialisationDesigner: body.specialisationDesigner || "",
        bioDesigner: body.bioDesigner || "",
        portfolio: body.portfolio || [],
        socialMedia: body.socialMedia || {
          instagram: "",
          pinterest: "",
          twitter: ""
        },
        projectsCompleted: body.projectsCompleted || 0,
        ratingDesigner: 0,
        noRatersDesigner: 0
      }),
      
      // Manufacturer fields (only populated if the user has a MANUFACTURER role)
      ...(validatedRoles.includes(UserRoles.MANUFACTURER) && {
        name: body.name || "",
        city: body.city || "",
        ratingManu: 0,
        noReviews: 0,
        minQuantity: body.minQuantity || "",
        capacity: body.capacity || "",
        price: body.price || ""
      }),
      
      // Seller fields (only populated if the user has a SELLER role)
      ...(validatedRoles.includes(UserRoles.SELLER) && {
        products: body.products || []
      })
    })

    await newUser.save()

    // Send verification email
    try {
      await sendVerificationEmail(email.toLowerCase(), token, newUser._id.toString())
    } catch (emailError) {
      console.error("Error sending verification email:", emailError)
    }

    return NextResponse.json({
      message: "User registered successfully. Please check your email to verify your account.", 
      user: {
        id: newUser._id,
        email: newUser.email,
        roles: newUser.roles,
        token: newUser.token
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Signup error:", error)
    if (error instanceof Error && error.name === "ValidationError") {
      const validationErrors = (error as any).errors || {}
      return NextResponse.json({ message: "Validation failed", errors: validationErrors }, { status: 400 })
    }
    return NextResponse.json({ message: "An unexpected error occurred during signup" }, { status: 500 })
  }
}

async function sendVerificationEmail(email: string, token: string, id: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  await transporter.verify((err, success) => {
    if (err) {
      console.error("SMTP verify failed:", err);
    } else {
      console.log("SMTP server is ready to take our messages");
    }
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verification` +
    `/${token}`+
    `/${encodeURIComponent(id)}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,        
    to: email,
    subject: "Verify your email address",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
          }
          .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eaeaea;
          }
          .logo {
            max-width: 200px;
            height: auto;
          }
          .content {
            padding: 30px 20px;
            text-align: center;
          }
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #1a1a1a;
          }
          .message {
            font-size: 16px;
            margin-bottom: 30px;
            color: #555;
          }
          .button {
            display: inline-block;
            background-color: #3f51b5;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: 600;
            margin: 20px 0;
          }
          .button:hover {
            background-color: #303f9f;
          }
          .alternative {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
          }
          .alternative a {
            color: #3f51b5;
            text-decoration: underline;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eaeaea;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <!-- Replace with your actual logo -->
            <h2 style="color: #3f51b5;">DESIGNIQUE</h2>
          </div>
          <div class="content">
            <div class="title">Verify Your Email Address</div>
            <div class="message">
              Thank you for registering with Designique. To complete your registration, please verify your email address.
            </div>
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
            <div class="alternative">
              If the button doesn't work, copy and paste this link into your browser:
              <br>
              <a href="${verificationUrl}">${verificationUrl}</a>
            </div>
          </div>
          <div class="footer">
            <p>If you did not sign up for Designique, you can safely ignore this email.</p>
            <p>© ${new Date().getFullYear()} Designique. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}
