export interface TicketType {
  name: string;
  price: number;
  quantity: number;
}

export interface EventDetails {
  event_id: string;
  title: string;
  venue: string;
  location: string;
  startDate: Date;
  ticketTypes: TicketType[];
}

export interface Event {
  event: EventCardProps;
}

export interface EventCardProps {
  event_id: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  category: string;
  startDate: Date;
  endDate: Date;
  ticketTypes: TicketType[];
  bannerUrl: string;
  soldTickets: number;
  totalTickets: number;
  status: string;
  maxCapacity: number;
  price: number;
  organizer: string;
}

export interface TicketProps {
  qr_code?: string;
  status?: string;
  ticket_number?: string;
  ticket_type: string;
  event: EventDetails;
}
