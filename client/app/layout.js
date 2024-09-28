'use client'
import "./globals.css";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
