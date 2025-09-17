import { TicketInput, TicketProps, TicketType } from "@/hooks/definitions";
import supabase from "@/lib/supabase";
import { ParamValue } from "next/dist/server/request/params";

export async function getUserTickets(userId: string) {
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select(
      `ticket_id,ticket_number,ticket_type,status,qr_code,price, is_verified, event:events(event_id, title, startDate, venue, location, ticketTypes)`
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Error fetching tickets");
  return tickets;
}

export async function getUserTicketById(ticketId: string | ParamValue) {
  const { data: ticket, error } = await supabase
    .from("tickets")
    .select(
      `ticket_id,
      ticket_number,
      user_name,
       user_phone_number,
       ticket_type,
       status,
       qr_code,
       price,
        is_verified,
       event:events(event_id, title, startDate, venue, location, ticketTypes)`
    )
    .eq("ticket_id", ticketId) // fetch specific ticket
    .single(); // only one result expected

  if (error) throw new Error("Error fetching ticket");
  return ticket;
}

export const createTicket = async (ticket: TicketInput) => {
  const formattedTicket = {
    ticket_number: ticket.ticket_number,
    qr_code: null,
    ticket_type: ticket.ticket_type,
    price: ticket.price,
    user_id: ticket.user_id || null,
    event_id: ticket.event_id,
    user_name: ticket.user_name,
    user_phone_number: ticket.user_phone_number,
  };

  const { data: newTicket, error: ticketError } = await supabase
    .from("tickets")
    .insert([formattedTicket])
    .select()
    .single();

  if (ticketError) {
    console.error(ticketError);
    throw new Error("Error generating ticket");
  }
  return newTicket as TicketProps;
};

export async function updateTicketCount(event_id: string, ticketName: string) {
  // 1. Fetch the current event
  const { data: event, error: fetchError } = await supabase
    .from("events")
    .select("ticketTypes")
    .eq("event_id", event_id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Failed to fetch event");
  }

  // 2. Parse ticketTypes
  const tickets =
    typeof event.ticketTypes === "string"
      ? JSON.parse(event.ticketTypes)
      : event.ticketTypes;

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

  return updatedEvent;
}

export async function purchaseTicket(
  payload,
  reference,
  selectedTicket,
  event
) {
  const newTicket = createTicket(payload);

  updateTicketCount(event?.event_id || "", selectedTicket?.name || ""); // ✅ update ticket quantitiy event
  return newTicket;
}
