import LandingPage from "../components/home/LandingPage";
import Events from "../components/home/Events";
import Header from "@/components/ui/header";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const search = (await searchParams.search) || "";
  const category = searchParams.category || "";

  return (
    <div className="font-sans">
      <Header />
      <LandingPage />
      <Events search={search} category={category} />
    </div>
  );
}
