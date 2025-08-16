import LandingPage from "../components/home/LandingPage";
import Events from "../components/home/Events";

export default async function Home() {
  return (
    <div className="font-sans">
      <LandingPage />
      <Events />
    </div>
  );
}
