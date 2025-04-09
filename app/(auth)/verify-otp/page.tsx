import type { Metadata } from "next";
import { VerifyOtpForm } from "@/components/verify-otp-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify OTP",
};

export default function Register() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}
