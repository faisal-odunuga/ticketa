import EventDetailsClient from "@/components/home/EventDetails";
import { EventCardProps } from "@/hooks/definitions";
import { getSingleEvent } from "@/services/apiEvents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details",
  description: "Detailed view of the event",
};

// Added a workaround to explicitly cast `params` to the expected type
export default async function EventDetailsPage({
  params,
}: {
  params: { event_id: string };
}) {
  const { event_id } = params as { event_id: string };

  const event: EventCardProps | null = await getSingleEvent(event_id);

  if (!event) return <p>Event not found</p>;

  return <EventDetailsClient event={event} />;
}
