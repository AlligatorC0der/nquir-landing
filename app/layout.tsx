import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nquir | AI-Powered Platform for Compliance-Critical Work",
  description:
    "Professional toolkit for structured inquiries, evidence-based assessments, and compliant reporting. Built for government, healthcare, and corporate compliance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
