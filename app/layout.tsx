import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Koles Fancy URL Shortener",
  description:
    "URL Shortener for the modern web, built with React 18.3, Next.js, tailwind, and DrizzleORM. Made by Kole Tackney.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
