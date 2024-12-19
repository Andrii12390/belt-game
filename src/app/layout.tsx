import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Belt game",
  description: "An exciting card game – belt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh">
        {children}
      </body>
    </html>
  );
}
