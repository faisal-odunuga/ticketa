import { TicketInput, TicketType } from "@/hooks/definitions";
import supabase from "@/lib/supabase";

export async function getUserTickets(userId: string) {
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select(
      `ticket_number,ticket_type,status,qr_code,price,event:events(event_id, title, startDate, venue, location, ticketTypes)`
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Error fetching tickets");
  return tickets;
}

export const createTicket = async (ticket: TicketInput) => {
  const formattedTicket = {
    ticket_number: ticket.ticket_number,
    qr_code: null,
    ticket_type: ticket.ticket_type,
    price: ticket.price,
    user_id: ticket.user_id,
    event_id: ticket.event_id,
  };

  console.log(formattedTicket);

  const { data: newTicket, error: ticketError } = await supabase
    .from("tickets")
    .insert([formattedTicket])
    .select()
    .single();

  if (ticketError) {
    console.error(ticketError);
    throw new Error("Error generating ticket");
  }
  return newTicket;
};

export async function updateTicketCount(event_id: string, ticketName: string) {
  // 1. Fetch the current event
  const { data: event, error: fetchError } = await supabase
    .from("events")
    .select("ticketTypes")
    .eq("event_id", event_id)
    .single();
  console.log("I got here", event);

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Failed to fetch event");
  }

  // 2. Parse ticketTypes
  const tickets =
    typeof event.ticketTypes === "string"
      ? JSON.parse(event.ticketTypes)
      : event.ticketTypes;
  console.log("I got here too", tickets);

  // 3. Update the correct ticket type
  const updatedTickets = tickets.map((t: TicketType) => {
    if (t.name.toLowerCase() === ticketName.toLowerCase()) {
      return {
        ...t,
        sold_tickets: t.sold_tickets + 1,
      };
    }
    return t;
  });
  console.log("I got here too", updatedTickets);

  // 4. Save back to DB
  const { data: updatedEvent, error: updateError } = await supabase
    .from("events")
    .update({ ticketTypes: updatedTickets })
    .eq("event_id", event_id)
    .select();

  if (updateError) {
    console.error(updateError);
    throw new Error("Failed to update tickets");
  }
  console.log(updatedEvent);

  return updatedEvent;
}
