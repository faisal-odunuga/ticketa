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

  if (!event)
    return (
      <div className="h-screen flex items-center justify-center">
        <h2>Event not found</h2>
      </div>
    );
  if (isSoldOut)
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-red-600 text-2xl">Tickets are sold out</h2>
      </div>
    );

  return <OrderSummary event={event} />;
}
