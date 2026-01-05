import { EventCardProps } from '@/hooks/definitions';
import { getDate, getTicketCount, getTime } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';
import { GrLocation } from 'react-icons/gr';
import { LuUsers } from 'react-icons/lu';
import Button from '../ui/button/Button';

const EventCard = ({ event }: { event: EventCardProps }) => {
  const { totalTickets, soldTickets } = getTicketCount(event.ticketTypes);

  const isSoldOut = soldTickets >= totalTickets;

  return (
    <div className='group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col'>
      <div className='relative h-56 overflow-hidden'>
        <Image
          src={event.bannerUrl}
          alt={event.title || 'Event image'}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-110'
          loading='lazy'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

        <div className='absolute top-4 left-4'>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary shadow-sm'>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>

        <div className='absolute top-4 right-4'>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${isSoldOut ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {isSoldOut ? 'Sold Out' : 'Available'}
          </span>
        </div>
      </div>

      <div className='p-6 flex flex-col flex-1 space-y-4'>
        <div className='space-y-2 flex-1'>
          <h3 className='font-bold text-xl text-gray-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors'>
            {event.title}
          </h3>
          <div className='flex items-center text-sm text-muted-foreground font-medium'>
            <GrLocation className='mr-1.5 h-4 w-4 shrink-0' />
            <span className='truncate'>
              {event.venue}, {event.location}
            </span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground font-medium'>
            <CiCalendar className='mr-1.5 h-4 w-4 shrink-0' />
            <span>
              {getDate(event.startDate)} • {getTime(event.startDate)}
            </span>
          </div>
        </div>

        <div className='space-y-4 border-t border-gray-100 pt-4'>
          <div className='space-y-2'>
            <div className='flex justify-between text-xs font-medium text-gray-500'>
              <span className='flex items-center'>
                <LuUsers className='mr-1 h-3 w-3' /> {soldTickets} sold
              </span>
              <span>{Math.round((soldTickets / totalTickets) * 100)}%</span>
            </div>
            <div className='w-full bg-gray-100 rounded-full h-1.5 overflow-hidden'>
              <div
                className={`h-full rounded-full transition-all duration-500 ${isSoldOut ? 'bg-red-500' : 'bg-primary'}`}
                style={{ width: `${(soldTickets / totalTickets) * 100}%` }}
              ></div>
            </div>
          </div>

          <Link href={`/event-details/${event.event_id}`} className='block'>
            <Button
              btnText={isSoldOut ? 'Sold Out' : 'Get Tickets'}
              className={`w-full py-2.5 rounded-xl font-medium transition-all duration-300 ${
                isSoldOut
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                  : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
              }`}
              disabled={isSoldOut}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
