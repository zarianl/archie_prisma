
import './globals.css'

// import { SessionProvider } from "next-auth/react";
import React from "react";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>

      {children}

    </body>
    </html>
  )
}
