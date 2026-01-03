import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "tajulislam199595@gmail.com",
    pass:  "dkre hspg wmio btat",
  },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins:[process.env.APP_URL!],
    user:{
      additionalFields:{
        role:{
          type:"string",
          defaultValue:"USER",
          required:false
        },
        phone:{
          type:"string",
          required:false
        },
        status:{
          type:"string",
          defaultValue:"ACTIVE",
          required:false
        }
      }


    },
     emailAndPassword: { 
    enabled: true, 
    autoSignIn:false,
    requireEmailVerification:true
  }, 
  emailVerification: {
    sendOnSignUp:true,
    autoSignInAfterVerification:true,
    sendVerificationEmail: async ( { user, url, token }, request) => {
      const verificationUrl=`${process.env.APP_URL}/verify-email?token=${token}`
      const info = await transporter.sendMail({
    from: '"PRISMA BLOG" <maddison53@ethereal.email>',
    to: user.email,
    subject: `VERIFY YOUR EMAIL ${user.name}`,
    
    html:`<div class="content"> <p>Hi <strong>{${user.name}}</strong>,</p> <p> Thanks for signing up for <strong>PRISMA BLOG</strong>! Please confirm your email address by clicking the button below. </p> <p style="text-align: center;"> <a href="${verificationUrl}" class="btn">Verify Email</a> </p> <p> If the button doesn’t work, copy and paste this link into your browser: </p> <p class="link">{{verificationUrl}}</p> <p> If you didn’t create an account, you can safely ignore this email. </p> <p>Thanks,<br />The PRISMA BLOG Team</p> </div> <div class="footer"> © 2025 PRISMA BLOG. All rights reserved. </div> </div>`
  });

  console.log("Message sent:", info.messageId);
    },
  },
});