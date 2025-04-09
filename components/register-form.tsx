"use client";

import { Heading } from "@/components/ui/heading";
import { ErrorMessage, Field, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Strong, Text, TextLink } from "@/components/ui/text";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "Ahmad Afifuddin",
      email: "ahmadafifudding@gmail.com",
      password: "Admin123#",
    },
  });

  async function onSubmit(formData: z.infer<typeof authSchema>) {
    startTransition(async function () {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        router.push(`/verify-otp?email=${formData.email}`);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full max-w-sm grid-cols-1 gap-8"
    >
      <Heading>Create your account</Heading>
      <Field>
        <Label htmlFor="name">Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input id="name" type="name" {...field} />}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input id="email" type="email" {...field} />}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input id="password" type="password" {...field} />
          )}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </Field>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
      <Text>
        Already have an account?{" "}
        <TextLink href="/login">
          <Strong>Sign in</Strong>
        </TextLink>
      </Text>
    </form>
  );
}
