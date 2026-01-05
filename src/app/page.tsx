import LandingPage from '../components/home/LandingPage';
import Events from '../components/home/Events';
import Header from '@/components/ui/header';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { search, category } = searchParams;

  return (
    <div className='font-sans relative'>
      <Header />
      <LandingPage />
      <Events search={search} category={category} />
    </div>
  );
}
