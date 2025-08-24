import { EventCardProps } from "@/hooks/definitions";
import supabase from "@/lib/supabase";

export async function getAllEvents({
  search,
  category,
}: { search?: string; category?: string } = {}) {
  let query = supabase.from("events").select("*");

  // Apply category filter
  if (category) {
    query = query.eq("category", category);
  }

  // Apply search filter (example: matches event title or description)
  if (search) {
    query = query
      .ilike("title", `%${search}%`)
      .or(`description.ilike.%${search}%`);
  }

  const { data: events, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Events could not be loaded");
  }

  return events;
}

export async function getSingleEvent(
  event_id: string
): Promise<EventCardProps | null> {
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

export async function getUserEvents(userId: string) {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("organizer_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error("Error fetching events");

  return events;
}
export async function getEventsCategories() {
  const { data: catatories, error } = await supabase
    .from("events")
    .select("category");

  if (error) throw new Error("Error fetching catetories");
  const uniqueCategories = Array.from(
    new Set(catatories.map((item) => item.category))
  );

  return uniqueCategories;

  // return catatories;
}
