import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/database/drizzle";
import { accounts, sessions, users, verifications } from "@/auth-schema";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  appName: "PlanIt",
  plugins: [
    admin(),
    emailOTP({
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp }) {
        try {
          await resend.emails.send({
            from: "PlanIt <malin@planit.ahmadafifudding.dev>",
            to: email,
            subject: "Your Verification Code",
            html: `
              <h1>Verify Your Email</h1>
              <p>Your verification code is:</p>
              <h2>${otp}</h2>
              <p>This code is valid only for 10 minutes.</p>
            `,
          });
          console.log("OTP Sent successfully to:", email);
        } catch (error) {
          console.error("Failed to send OTP:", error);
        }
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users,
      accounts,
      sessions,
      verifications,
    },
    usePlural: true,
  }),
});
