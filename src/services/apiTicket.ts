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

export async function updateTicketWithQR(ticket_id: string, qr: string) {
  const { data, error } = await supabase
    .from("tickets")
    .update({ qr_code: qr }) // make sure your tickets table has `qr_code` column
    .eq("ticket_id", ticket_id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

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

export async function generateTicketQR(ticket: {
  ticket_id: string;
  ticket_type: string;
  name: string;
  event_id: string;
}) {
  const { data, error } = await supabase.functions.invoke("generate-qr", {
    body: {
      text: JSON.stringify(ticket), // pass ticket details as text
    },
  });

  if (error) {
    console.error("QR generation failed:", error);
    return null;
  }

  return data.qr; // base64 QR code image
}

export async function purchaseTicket(payload, selectedTicket, event) {
  // 1️⃣ Create ticket first (to get the ticket_id)
  const newTicket = await createTicket(payload);

  if (!newTicket?.ticket_id) {
    throw new Error("Failed to create ticket");
  }

  // 2️⃣ Generate QR with the ticket_id and other details
  const qr = await generateTicketQR({
    ticket_id: newTicket.ticket_id,
    event_id: event.event_id,
    name: payload.user_name,
    ticket_type: selectedTicket.name,
  });

  // 3️⃣ Update ticket to include QR code
  const updatedTicket = await updateTicketWithQR(newTicket.ticket_id, qr);

  // 4️⃣ Update ticket count
  await updateTicketCount(event?.event_id || "", selectedTicket?.name || "");

  // 5️⃣ Return updated ticket (with QR)
  return updatedTicket;
}
