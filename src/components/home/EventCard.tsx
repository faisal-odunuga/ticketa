import { EventCardProps } from "@/hooks/definitions";
import { getDate, getTicketCount, getTime } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { LuUsers } from "react-icons/lu";
import Button from "../ui/button/Button";

const EventCard = ({ event }: { event: EventCardProps }) => {
  const { totalTickets, soldTickets } = getTicketCount(event.ticketTypes);
  return (
    <div className="rounded-lg border shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="relative">
        <Image
          src={event.bannerUrl}
          alt={event.title || "Event image"}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />

        <div className="inline-flex items-center rounded-full absolute top-4 left-4 bg-blue-600 text-white px-2.5 py-0.5 text-xs font-semibold hover:bg-black/50">
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>

        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full border">
          <span className="text-blue-600 font-bold">Available</span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        <h3 className="font-semibold tracking-tight text-xl text-gray-900 line-clamp-2">
          {event.title}
        </h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center space-x-2">
            <CiCalendar />
            <span>
              {getDate(event.startDate)} at {getTime(event.startDate)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <GrLocation />
            <span>
              {event.venue}, {event.location}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <LuUsers />
            <span>
              {soldTickets} / {totalTickets}{" "}
              {soldTickets > 1 ? "tickets" : "ticket"}
              {" sold"}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={
              "bg-blue-600 h-2 rounded-full transition-all duration-300"
            }
            style={{
              width: `${(soldTickets / totalTickets) * 100}%`,
            }}
          ></div>
        </div>

        <Link href={`/event-details/${event.event_id}`} className="block">
          <Button btnText="View Details & Buy Tickets" className="w-full" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
