import GoBack from "@/components/ui/go-back/GoBack";
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
      <div className="mb-4 sticky top-4 z-20">
        <GoBack />
      </div>

      {children}
    </main>
  );
}
