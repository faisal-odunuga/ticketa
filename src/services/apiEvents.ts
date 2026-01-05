import { EventCardProps, NewEventFormValues } from '@/hooks/definitions';
import supabase from '@/lib/supabase';

const bucketUrl = 'https://emmqmitwbsgbejfjwxun.supabase.co/storage/v1/object/public/event-images';

export async function getAllEvents({
  search,
  category,
}: { search?: string; category?: string } = {}) {
  let query = supabase.from('events').select('*').order('startDate', { ascending: true });

  // Apply category filter
  if (category) {
    query = query.eq('category', category);
  }

  // Apply search filter (example: matches event title or description)
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%,venue.ilike.%${search}%`
    );
  }

  const { data: events, error } = await query;

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Could not load events. Please try again later.');
  }
  return events;
}

export async function getSingleEvent(event_id: string): Promise<EventCardProps | null> {
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('event_id', event_id)
    .single();

  if (error) {
    console.error(`Error fetching event ${event_id}:`, error);
    throw new Error('Could not load event details.');
  }
  return event;
}

export async function getUserEvents(userId: string) {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('organizer_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user events:', error);
    throw new Error('Could not load your events.');
  }

  return events;
}

export async function getEventsCategories() {
  const { data: events, error } = await supabase.from('events').select('category');

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Could not load categories.');
  }

  // Use Set to get unique categories and sort them
  const uniqueCategories = Array.from(new Set(events.map((item) => item.category))).sort();

  return uniqueCategories;
}

export const createEvent = async (newEvent: NewEventFormValues) => {
  // Extract file
  const file = (newEvent.bannerUrl as unknown as FileList)?.[0];
  if (!file) throw new Error('Banner image is required');

  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

  const { error: uploadError } = await supabase.storage
    .from('event-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Image upload failed:', uploadError);
    throw new Error('Failed to upload event image.');
  }

  const formattedEvent = {
    ...newEvent,
    bannerUrl: `${bucketUrl}/${fileName}`,
  };

  const { data, error: eventError } = await supabase
    .from('events')
    .insert([formattedEvent])
    .select()
    .single();

  if (eventError) {
    console.error('Event creation failed:', eventError);
    // Cleanup image if event creation fails
    await supabase.storage.from('event-images').remove([fileName]);
    throw new Error('Failed to create event. Please try again.');
  }

  return data;
};

export async function getEventTickets(eventId: string) {
  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('event_id', eventId);

  if (error) {
    console.error(`Error fetching tickets for event ${eventId}:`, error);
    throw new Error('Could not load tickets.');
  }
  return tickets;
}

export async function verifyTicket(ticketId: string) {
  const { data: updatedTicket, error: updateError } = await supabase
    .from('tickets')
    .update({ is_verified: true })
    .eq('ticket_id', ticketId)
    .select()
    .single();

  if (updateError || !updatedTicket) {
    console.error('Ticket verification failed:', updateError);
    throw new Error('Ticket verification failed. Please try again.');
  }

  return updatedTicket;
}
