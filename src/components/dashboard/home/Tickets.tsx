import Loader from "@/components/ui/loader/Loader";
import TicketCard from "@/components/ui/ticket/Ticket";
import { getUserTickets } from "@/services/apiTicket";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Tickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: getUserTickets,
  });

  if (isLoading) return <Loader />;
  return (
    <section>
      {tickets.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket} />
      ))}
    </section>
  );
};

export default Tickets;
