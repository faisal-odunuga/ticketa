"use client";

import { EventCardProps } from "@/hooks/definitions";
import { getFormattedDate, getTime } from "@/utils/helpers";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { CiCalendar } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { LuUser, LuUsers } from "react-icons/lu";

export default function EventDetailsClient({
  event,
}: {
  event: EventCardProps;
}) {
  // const router = useRouter();

  // const handleTicketPurchase = () => {
  //   router.push(`/order-summary?eventId=${event?.event_id}`);
  // };

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

          <div className="lg:col-span-1 border rounded-lg p-4">
            <h1>Test</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
