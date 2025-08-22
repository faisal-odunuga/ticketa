import supabase from "@/lib/supabase";
// export async function getUserTickets() {
//   const { data: tickets, error } = await supabase
//     .from("tickets")
//     .select(
//       `ticket_number,ticket_type,status,qr_code,event:events(event_id, title, startDate, venue, location, ticketTypes)`
//     )
//     .eq("user_id", user.id)
//     .order("created_at", { ascending: false });
//   if (error) {
//     console.error(error);
//     throw new Error("Error Fetching Tickets");
//   }
//   return tickets;
// }

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
