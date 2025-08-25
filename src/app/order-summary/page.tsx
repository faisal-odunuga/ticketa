import OrderSummary from "@/components/home/OrderSummary";
import { getSingleEvent } from "@/services/apiEvents";

export default async function OrderSummaryPage({
  searchParams,
}: {
  searchParams: { event_id?: string };
}) {
  const eventId = searchParams.event_id;
  const event = eventId ? await getSingleEvent(eventId) : null;

  return <OrderSummary event={event} />;
}
