export const metadata = {
  title: "Payment Status",
  description: "Check the payment status of your transaction",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section lang="en">
      <div>{children}</div>
    </section>
  );
}
