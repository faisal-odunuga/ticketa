import GoBack from "@/components/ui/go-back/GoBack";
import Header from "@/components/ui/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Summary",
  description: "Complete ticket info to complete your order",
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
