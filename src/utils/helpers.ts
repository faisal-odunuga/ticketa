import { EventCardProps } from "@/hooks/definitions";

export const SentenseCase = (word: string | undefined) => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1);
};

export const generatePath = {
  eventDetails: (eventId: string) => `/events/${eventId}`,
  paymentPage: (eventId: string) => `/dashboard/checkout/${eventId}`,
};

export const getDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getFormattedDate = (date: Date) => {
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
  const featuredEvents = events
    .map((item: EventCardProps) => ({
      ...item,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
    }))
    .filter((item) => item.endDate > now)
    .sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
  return featuredEvents;
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};
