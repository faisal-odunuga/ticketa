import EventDetailsClient from "@/components/home/EventDetails";
import { getSingleEvent } from "@/services/apiEvents";

export default async function EventDetailsPage({
  params,
}: {
  params: { event_id: string };
}) {
  const { event_id } = params;
  const event = await getSingleEvent(event_id);
  return <EventDetailsClient event={event} />;
}
