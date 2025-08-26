import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/state/Providers";
import { ToastContainer } from "react-toastify";
import { UserEventsProvider } from "@/state/EventsContext";
import { AuthProvider } from "@/state/AuthProvider";

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
        <Providers>
          <AuthProvider>
            <UserEventsProvider>
              <main>{children}</main>
            </UserEventsProvider>
          </AuthProvider>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
