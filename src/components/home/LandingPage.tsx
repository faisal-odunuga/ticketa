import Filters from '../ui/filter-box/Filterbox';

const LandingPage = () => {
  return (
    <section className='relative h-[600px] flex items-center justify-center overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-hero-pattern bg-cover bg-center'></div>
        <div className='absolute inset-0 bg-black/30'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 px-4 sm:px-6 lg:px-8 text-center text-white max-w-4xl mx-auto space-y-8 animate-fade-in'>
        <h1 className='text-5xl md:text-7xl font-bold tracking-tight leading-tight'>
          Discover <span className='text-accent'>Amazing</span> Events
        </h1>
        <p className='text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto font-light'>
          Find and book exclusive tickets for concerts, conferences, and immersive experiences.
        </p>

        <div className='pt-8 w-full max-w-3xl mx-auto animate-slide-up'>
          <Filters />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
