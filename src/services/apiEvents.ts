import supabase from "@/lib/supabase";

export async function getAllEvents() {
  const { data: events, error } = await supabase.from("events").select(`
    id,
    status,
    qrCode,
    event:events ( id, title, event_date, venue, location )
  `);
  if (error) {
    console.error(error);
    throw new Error("Events could not be loaded");
  }
  return events;
}

export async function getSingleEvent(event_id: string) {
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("event_id", event_id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Event could not be loaded");
  }
  return event;
}
