import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shared Grid",
  description: "Real-time collaborative grid app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
