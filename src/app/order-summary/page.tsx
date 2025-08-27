import OrderSummary from "@/components/payment-summary/OrderSummary";
import { getSingleEvent } from "@/services/apiEvents";
import { getTicketCount } from "@/utils/helpers";

export default async function OrderSummaryPage({
  searchParams,
}: {
  searchParams: { event_id?: string };
}) {
  const eventId = await searchParams.event_id;
  const event = eventId ? await getSingleEvent(eventId) : null;
  const { totalTickets, soldTickets } = getTicketCount(event.ticketTypes);
  const isSoldOut = totalTickets === soldTickets;

  if (!event) return <p>Event not found</p>;
  if (isSoldOut) return <p>Tickets are sold out</p>;

  return <OrderSummary event={event} />;
}
