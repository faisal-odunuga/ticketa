import { EventCardProps, NewEventFormValues } from "@/hooks/definitions";
import supabase from "@/lib/supabase";

const bucketUrl =
  "https://emmqmitwbsgbejfjwxun.supabase.co/storage/v1/object/public/event-images";

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
      .or(`description.ilike.%${search}%`)
      .or(`location.ilike.%${search}%`)
      .or(`venue.ilike.%${search}%`);
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
}

export const createEvent = async (newEvent: NewEventFormValues) => {
  // Extract file
  const file = (newEvent.bannerUrl as unknown as FileList)?.[0];
  if (!file) throw new Error("Banner image is required");

  const fileName = `${newEvent.title}-${Date.now()}`;

  const { error: uploadError } = await supabase.storage
    .from("event-images")
    .upload(fileName, file);

  if (uploadError) {
    console.error(uploadError);
    throw new Error("Error uploading image");
  }

  const formattedEvent = {
    ...newEvent,
    bannerUrl: `${bucketUrl}/${fileName}`,
  };

  const { data, error: eventError } = await supabase
    .from("events")
    .insert([formattedEvent])
    .select()
    .single();

  if (eventError) {
    console.error(eventError);
    throw new Error("Event could not be created");
  }

  return data;
};

export async function getEventTickets(eventId: string) {
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("event_id", eventId);

  if (error) {
    console.error(error);
    throw new Error("Tickets could not be loaded");
  }
  return tickets;
}

export async function verifyTicket(ticketId: string) {
  const { data: updatedTicket, error: updateError } = await supabase
    .from("tickets")
    .update({ is_verified: true })
    .eq("ticket_id", ticketId)
    .select()
    .single();

  if (updateError || !updatedTicket) {
    console.error(updateError);
    throw new Error("Ticket could not be verified");
  }

  return updatedTicket;
}
