import localFont from "next/font/local";
import type { Metadata } from "next";

import "./globals.css";

const ibmPlexSans = localFont({
  src: [
    { path: "../fonts/IBMPlexSans-Bold.ttf", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/IBMPlexSans-Regular.ttf", weight: "600", style: "normal" },
    { path: "../fonts/IBMPlexSans-SemiBold.ttf", weight: "700", style: "normal" },
  ],
});

const babasNeue = localFont({
  src: [
    { path: "../fonts/BebasNeue-Regular.ttf", weight: "700", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${babasNeue.variable} antialiased min-h-screen w-full`}
      >
        {children}
      </body>
    </html>
  );
}
