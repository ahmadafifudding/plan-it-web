import React from "react";
import { AuthLayout } from "@/components/layout/auth-layout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
