'use client';
import { getAllEvents } from '@/services/apiEvents';
import EventCard from './EventCard';
import { useQuery } from '@tanstack/react-query';
import Loader from '../ui/loader/Loader';
import { getFeaturedEvents } from '@/utils/helpers';

const Events = ({ search, category }) => {
  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['events', search, category],
    queryFn: () => getAllEvents({ search, category }),
  });

  console.log(events);

  const featuredEvents = getFeaturedEvents(events);

  if (isLoading)
    return (
      <div className='w-full h-full'>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className='w-full h-full flex items-center justify-center p-4 text-red-500 text-3xl bg-inherit'>
        Error: {error.message}
      </div>
    );
  return (
    <>
      <section className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: featuredEvents.map((event, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Event',
                  name: event.title,
                  startDate: event.startDate,
                  location: {
                    '@type': 'Place',
                    name: event.venue,
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: event.location,
                    },
                  },
                  image: event.bannerUrl,
                  description: event.description,
                  offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/InStock',
                  },
                },
              })),
            }),
          }}
        />
        <div className='flex items-end justify-between border-b border-gray-200 pb-4'>
          <div className='space-y-2'>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'>
              Upcoming Events
            </h2>
            <p className='text-muted-foreground text-lg'>
              Explore the latest happenings around you
            </p>
          </div>
          <div className='hidden md:block text-sm text-muted-foreground bg-gray-100 px-3 py-1 rounded-full'>
            {featuredEvents.length} event{featuredEvents.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {featuredEvents.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {featuredEvents.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300'>
            <p className='text-xl text-muted-foreground'>No events found matching your criteria.</p>
            <button
              onClick={() => (window.location.href = '/')}
              className='mt-4 text-primary font-medium hover:underline'
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
};
export default Events;
