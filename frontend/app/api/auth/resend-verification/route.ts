import { NextResponse } from "next/server"
import connectMongo from "@/lib/db/connectMongo"
import { User } from "@/models/Users"
import nodemailer from "nodemailer"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
   try {
      await connectMongo()
   } catch (error) {
      console.error("Error connecting to MongoDB", error)
      return NextResponse.json({ message: "Failed to connect to database" }, { status: 500 })
   }

   try {
      const body = await req.json()
      const { email } = body

      if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
         return NextResponse.json({ message: "Valid email is required" }, { status: 400 })
      }

      const user = await User.findOne({ email: email.toLowerCase() })

      if (!user) {
         return NextResponse.json({ message: "User not found with this email" }, { status: 404 })
      }

      if (user.isVerified) {
         return NextResponse.json({ 
            message: "This email is already verified. You can sign in now." 
         }, { status: 200 })
      }

      const token = Array.from(
         { length: 16 },
         () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]
      ).join("")

      user.token = token
      await user.save()

      const transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: Number(process.env.SMTP_PORT),
         secure: process.env.SMTP_SECURE === "true",
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
         },
      })

      try {
         await transporter.verify((err) => {
            if (err) {
               console.error("SMTP verify failed:", err)
               throw new Error("Invalid SMTP configuration")
            }
         })
      } catch (verifyErr) {
         console.error("SMTP config error:", verifyErr)
         return NextResponse.json(
            { message: "Failed to configure email service" },
            { status: 500 }
         )
      }

      const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verification` +
         `/${token}` +
         `/${encodeURIComponent(user._id.toString())}`

      try {
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
                     <p>If you did not request this verification email, you can safely ignore it.</p>
                     <p>© ${new Date().getFullYear()} Designique. All rights reserved.</p>
                  </div>
               </div>
            </body>
            </html>
            `,
         })

         return NextResponse.json({ 
            message: "Verification email has been resent successfully" 
         }, { status: 200 })
      } catch (emailError) {
         console.error("Error sending verification email:", emailError)
         return NextResponse.json(
            { message: "Failed to send verification email" },
            { status: 500 }
         )
      }
   } catch (error) {
      console.error("Resend verification error:", error)
      return NextResponse.json({ 
         message: "An unexpected error occurred" 
      }, { status: 500 })
   }
}
