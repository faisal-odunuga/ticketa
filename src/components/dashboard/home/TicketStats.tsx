import Stats from "@/components/ui/stats/Stats";
import { useTickets } from "@/state/TicketInfoProvider";
import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { LuTicket } from "react-icons/lu";
import { TbCurrencyNaira } from "react-icons/tb";

const TicketStats = () => {
  const { ticketCount, amountSpent } = useTickets();

  const data = [
    { title: ticketCount, desc: "Total Tickets", Icon: LuTicket },
    { title: 2, desc: "Upcoming Events", Icon: CiCalendarDate },
    { title: amountSpent, desc: "Amount Spent", Icon: TbCurrencyNaira },
  ];

  return (
    <div>
      <Stats data={data} />
    </div>
  );
};

export default TicketStats;
