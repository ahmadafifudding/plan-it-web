import type { Metadata } from "next";
import { VerifyOtpForm } from "@/components/verify-otp-form";

export const metadata: Metadata = {
  title: "Verify OTP",
};

export default function Register() {
  return <VerifyOtpForm />;
}
