import { IconType } from "react-icons";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type SignInFormValues = {
  email: string;
  password: string;
};
export interface SignUpFormValues {
  name: string;
  email: string;
  gender: string;
  password: string;
  image: FileList;
}

export interface Profile {
  name: string;
  email: string;
  gender: "male" | "female";
  image: string;
  user_id: string;
  created_at: string;
}
export interface UserWithProfile extends SupabaseUser {
  profile?: Profile;
}

export interface TicketType {
  name: string;
  price: number;
  sold_tickets?: number;
  total_tickets?: number;
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

export interface NewEventFormValues {
  title: string;
  description: string;
  location: string;
  venue: string;
  category: string;
  startDate: string; // "2025-10-12T08:00"
  endDate: string;
  ticketTypes: TicketType[];
  bannerUrl: FileList; // file input
  status: string;
  organizer: string;
}

export interface EventCardProps {
  event_id?: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  category: string;
  startDate: string | Date; // ISO string
  endDate: string | Date;
  ticketTypes: TicketType[];
  bannerUrl?: string; // public URL
  status: string;
  maxCapacity?: number;
  organizer: string;
  event_code: string;
}

export interface TicketProps {
  qr_code?: string;
  status?: string;
  ticket_number?: string;
  ticket_type: string;
  amount: number;
  event: EventDetails;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  gender: string;
  ticket_type: string;
  price: number;
  number: number;
}

export interface StatItem {
  title: number;
  desc: string;
  Icon: IconType;
}

export interface StatProp {
  data: StatItem[];
}

export interface ToggleFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowForm?: () => void;
}

export interface PaystackResponse {
  reference: string; // The unique transaction reference
  trans: string; // Transaction ID
  status: "success" | "failed" | "pending"; // Payment status
  message: string; // Status message from the gateway
  transaction: string; // Transaction ID (same as trans)
  trxref: string; // Transaction reference (same as reference)
  redirecturl: string; // URL to redirect the user after payment
}

export type TicketInput = {
  ticket_number: string;
  ticket_type: string;
  user_id: string;
  event_id: string;
  price: number;
};
