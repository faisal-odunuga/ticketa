"use client";

import { EventCardProps } from "@/hooks/definitions";
import { getFormattedDate, getTime } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiCalendar } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { LuUser, LuUsers } from "react-icons/lu";
import Button from "../ui/button/Button";

export default function EventDetailsClient({
  event,
}: {
  event: EventCardProps;
}) {
  const router = useRouter();

  const handleTicketPurchase = () => {
    router.push(`/order-summary?event_id=${event?.event_id}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg  max-w-5xl space-y-10">
        <div className="relative">
          <Image
            src={event!.bannerUrl!}
            alt={event?.title}
            width={600}
            height={300}
            className="w-full h-64 object-cover rounded-t-lg"
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
                  <p className="font-medium text-gray-900">Date & Time</p>
                  <p className="text-gray-600">
                    {getFormattedDate(event?.startDate)}
                  </p>
                  <p className="text-gray-600">{getTime(event?.startDate)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <GrLocation className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Venue</p>
                  <p className="text-gray-600">{event?.venue}</p>
                  <p className="text-gray-600">{event?.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <LuUsers className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Availability</p>
                  <p className="text-gray-600">
                    {event?.totalTickets
                      ? `${event?.soldTickets} / ${event?.totalTickets} ticket(s) available`
                      : "Tickets are still available"}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What to Expect
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <CiCalendar className="h-4 w-4 mt-1 text-blue-600" />
                  <span>Event duration: Approximately 3-4 hours</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LuUser className="h-4 w-4 mt-1 text-blue-600" />
                  <span>All ages welcome</span>
                </li>
                <li className="flex items-start space-x-2">
                  <GrLocation className="h-4 w-4 mt-1 text-blue-600" />
                  <span>Parking available on-site</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm sticky top-4">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold tracking-tight text-xl text-center">
                Get Your Tickets
              </h3>
            </div>

            <div className="p-6 pt-0 space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">$299</div>
                <div className="text-gray-600">per ticket</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background 
                     transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                     focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                     [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background 
                     hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                    disabled
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base 
                     ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                     file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none 
                     focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                     disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-center"
                    min="1"
                    max="10"
                    value="1"
                  />
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                     ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                     focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                     disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
                     border border-input bg-background hover:bg-accent hover:text-accent-foreground 
                     h-9 rounded-md px-3"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Maximum 10 tickets per purchase
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>$299</span>
                </div>
              </div>

              <Button
                btnText="Buy Now"
                className="w-full"
                onClick={handleTicketPurchase}
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
