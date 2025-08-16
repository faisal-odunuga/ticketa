import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/hooks/Providers";

export const metadata: Metadata = {
  title: "Ticketa",
  description: "Event Booking Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
