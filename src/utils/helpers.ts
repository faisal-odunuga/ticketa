import { EventCardProps, TicketType } from "@/hooks/definitions";

export const SentenseCase = (word: string | undefined) => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1);
};

export const generatePath = {
  eventDetails: (eventId: string) => `/events/${eventId}`,
  paymentPage: (eventId: string) => `/dashboard/checkout/${eventId}`,
};

export const getDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getTime = (date: Date | string) => {
  return new Date(date).toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getFormattedDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const getFeaturedEvents = (
  events: EventCardProps[]
): EventCardProps[] => {
  const now = new Date();

  // Convert dates to Date objects for comparison
  const processedEvents = events.map((item: EventCardProps) => ({
    ...item,
    startDate: new Date(item.startDate),
    endDate: new Date(item.endDate),
  }));

  // Filter events that are ongoing or upcoming
  const featuredEvents = processedEvents.filter((item) => item.endDate >= now);

  // Sort: ongoing events first, then upcoming by startDate
  featuredEvents.sort((a, b) => {
    const aOngoing = a.startDate <= now && a.endDate >= now;
    const bOngoing = b.startDate <= now && b.endDate >= now;

    if (aOngoing && !bOngoing) return -1; // ongoing first
    if (!aOngoing && bOngoing) return 1;
    return a.startDate.getTime() - b.startDate.getTime(); // upcoming next
  });

  return featuredEvents;
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const getTicketCount = (tickets: TicketType[]) => {
  const totalTickets = tickets.reduce(
    (acc, curr) => acc + curr.total_tickets,
    0
  );
  const soldTickets = tickets.reduce((acc, curr) => acc + curr.sold_tickets, 0);
  return { totalTickets, soldTickets };
};
