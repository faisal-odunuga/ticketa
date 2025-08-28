import GoBack from "@/components/ui/go-back/GoBack";
import Header from "@/components/ui/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ticketa",
  description: "Event Booking Made Easy",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`p-6 relative`}>
      <Header />
      <div className="fixed z-20">
        <GoBack />
      </div>

      {children}
    </main>
  );
}
