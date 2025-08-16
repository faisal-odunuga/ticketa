import supabase from "@/lib/supabase";

export async function getUserTickets() {
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select(
      `ticket_number,ticket_type,status,qr_code,event:events(event_id, title, startDate, venue, location, ticketTypes)`
    );
  if (error) {
    console.error(error);
    throw new Error("Error Fetching Tickets");
  }
  return tickets;
}
