import type { Metadata } from "next";

import "@/styles/globals.css";

import Nav from "@/components/Nav";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Nav>{children}</Nav>
        </UserProvider>
      </body>
    </html>
  );
}
