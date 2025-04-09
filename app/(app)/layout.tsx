import { ApplicationLayout } from "./application-layout";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
