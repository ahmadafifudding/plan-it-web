import "@/styles/tailwind.css";
import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "sonner";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: {
    template: "%s - PlanIt",
    default: "PlanIt",
  },
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <Providers>
          <Toaster richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
