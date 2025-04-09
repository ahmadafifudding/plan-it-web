"use client";

import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";
import {
  Description,
  ErrorMessage,
  Field,
  Label,
} from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isVerifying, startVerifyTransition] = useTransition();

  function verifyEmail(otp: string) {
    setErrorMessage(undefined);
    startVerifyTransition(async function () {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: email,
        otp,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/home");
      }
    });
  }

  return (
    <form className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Heading>Email Verification {email}</Heading>
      <Field>
        <Label htmlFor="name">One-Time Password (OTP)</Label>
        <div className="mt-3">
          <OTPInput
            className="inline-flex"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onComplete={verifyEmail}
            render={({ slots }) => (
              <div className="flex gap-x-4">
                {slots.map((slot, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "relative flex w-full size-12 items-center justify-center appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
                      "text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white",
                      "border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20",
                      "bg-transparent dark:bg-white/5",
                      "focus:outline-hidden",
                      "data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500",
                      "data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:data-hover:data-disabled:border-white/15",
                      "dark:[color-scheme:dark]",
                    )}
                  >
                    {slot.char}
                  </div>
                ))}
              </div>
            )}
          />
        </div>
        <div className="mt-3">
          {errorMessage && (
            <ErrorMessage className="capitalize">{errorMessage}</ErrorMessage>
          )}
          <Description>
            We have sent an OTP to your email. Please enter the OTP to verify
            your email.
          </Description>
        </div>
      </Field>
      <Button disabled={isVerifying}>
        {isVerifying ? "Verifying ..." : "Verify OT"}
      </Button>
    </form>
  );
}
