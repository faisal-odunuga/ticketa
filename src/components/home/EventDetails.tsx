"use client";

import { EventCardProps, TicketType } from "@/hooks/definitions";
import {
  getFormattedDate,
  getTicketCount,
  getTime,
  SentenseCase,
} from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiCalendar } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { LuUser, LuUsers } from "react-icons/lu";
import Button from "../ui/button/Button";
import { IoTicket } from "react-icons/io5";

export default function EventDetailsClient({
  event,
}: {
  event: EventCardProps;
}) {
  const router = useRouter();

  const handleTicketPurchase = () => {
    router.push(`/order-summary?event_id=${event?.event_id}`);
  };
  const { totalTickets, soldTickets } = getTicketCount(event.ticketTypes);
  const isSoldOut = soldTickets >= totalTickets;

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg  max-w-5xl space-y-10">
        <div className="relative">
          <Image
            src={event!.bannerUrl!}
            alt={event?.title}
            width={600}
            height={300}
            className="w-full h-64 object-cover rounded-t-lg border"
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {event?.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {event?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <CiCalendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-bold text-gray-900">Date & Time</p>
                  <p className="text-gray-600">
                    {getFormattedDate(event?.startDate)}
                  </p>
                  <p className="text-gray-600">{getTime(event?.startDate)}</p>
                  <h4 className="font-bold">To</h4>
                  <p className="text-gray-600">
                    {getFormattedDate(event?.endDate)}
                  </p>
                  <p className="text-gray-600">{getTime(event?.endDate)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <GrLocation className="h-5 w-5 text-blue-600" />
                <div>
                  <p className=" text-gray-900 font-bold">Venue</p>
                  <p className="text-gray-600">{event?.venue}</p>
                  <p className="text-gray-600">{event?.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <LuUsers className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-gray-900">Availability</h3>
                  <p className="text-gray-600">
                    {soldTickets} tickets sold of {totalTickets} total tickets
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <LuUser className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Organizer</p>
                  <p className="text-gray-600">{event?.organizer}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg  text-gray-900 mb-3 font-bold">
                Ticket Types
              </h3>
              <ul className="space-y-2 text-gray-600">
                {event.ticketTypes?.map((ticket: TicketType) => (
                  <li key={ticket.name} className="flex items-start space-x-2">
                    <IoTicket className="h-4 w-4 mt-1 text-blue-600" />

                    <span className="text-gray-600">
                      {SentenseCase(ticket.name)} -{" "}
                      {ticket.total_tickets - ticket.sold_tickets} Tickets
                      Available
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm sticky top-4">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold tracking-tight text-xl text-center">
                Get Your Tickets
              </h3>
            </div>

            <div className="p-6 pt-0 space-y-6">
              {event.ticketTypes?.map((ticket: TicketType) => (
                <div
                  key={ticket.name}
                  className="flex items-center justify-between border rounded-lg p-2"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {SentenseCase(ticket.name)}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      ₦ {ticket.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                btnText={isSoldOut ? "Sold Out" : "Buy Now"}
                className={`${
                  isSoldOut
                    ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                    : ""
                } w-full`}
                onClick={!isSoldOut ? handleTicketPurchase : undefined}
              />
              <p className="text-xs text-gray-500 text-center">
                Secure checkout powered by Ticketa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
