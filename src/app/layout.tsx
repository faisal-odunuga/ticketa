import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/state/Providers";
import { ToastContainer } from "react-toastify";
import { UserEventsProvider } from "@/state/EventsContext";

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
          <UserEventsProvider>
            <main>{children}</main>
          </UserEventsProvider>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
