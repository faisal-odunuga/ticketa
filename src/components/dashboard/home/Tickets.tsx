import TicketCard from "@/components/ui/ticket/Ticket";
import Loader from "@/components/ui/loader/Loader";
import { useTickets } from "@/state/TicketInfoProvider";

const TicketsPage = () => {
  const { tickets, ticketCount, isLoading, refetch } = useTickets();

  if (isLoading) return <Loader />;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">My Tickets ({ticketCount})</h2>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))
      ) : (
        <p>No tickets found</p>
      )}
      <button
        onClick={() => refetch()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refresh Tickets
      </button>
    </section>
  );
};

export default TicketsPage;
