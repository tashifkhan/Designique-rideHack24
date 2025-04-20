import { NextResponse } from "next/server"
import connectMongo from "@/lib/db/connectMongo"
import { User, UserRoles } from "@/models/Users"
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
      token
      // TODO: Add all the fields
    })

    await newUser.save()

    // Generate email verification link and send email using nodemailer

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
      }
    })

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}&email=${encodeURIComponent(email.toLowerCase())}`

    try {
      await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Designique" <no-reply@designique.com>',
      to: email,
      subject: "Verify your email address",
      html: `
        <p>Welcome to Designique!</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>If you did not sign up, please ignore this email.</p>
      `
      })
    } catch (err) {
      console.error("Error sending verification email", err)
      return NextResponse.json({ message: "Failed to send verification email" }, { status: 500 })
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
    // Handle potential validation errors from Mongoose or other unexpected errors
    if (error instanceof Error && error.name === "ValidationError") {
      const validationErrors = (error as any).errors || {}
      return NextResponse.json({ message: "Validation failed", errors: validationErrors }, { status: 400 })
    }
    return NextResponse.json({ message: "An unexpected error occurred during signup" }, { status: 500 })
  }
}
