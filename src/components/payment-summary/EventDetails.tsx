"use client";
import Image from "next/image";
import { GrLocation } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { EventCardProps } from "@/hooks/definitions";
import { getDate, getTime, SentenseCase } from "@/utils/helpers";

export default function EventDetails({
  event,
}: {
  event: EventCardProps | null;
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold">Event Details</h3>
      </div>

      <div className="p-6 pt-0 space-y-4">
        <div className="flex space-x-4">
          <Image
            src={event?.bannerUrl || ""}
            alt={event?.title || ""}
            width={600}
            height={300}
            className="w-20 h-20 object-cover rounded-lg border"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{event?.title}</h3>
            <p className="text-gray-600">
              {SentenseCase(event?.category || "")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <CiCalendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Date &amp; Time</p>
              <p className="font-medium">{getDate(event?.startDate)}</p>
              <p className="text-sm text-gray-600">
                {getTime(event?.startDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <GrLocation className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Venue</p>
              <p className="font-medium">{event?.venue}</p>
              <p className="text-sm text-gray-600">{event?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
