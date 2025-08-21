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

// export interface AppUser extends SupabaseUser {
//   profile?: Profile;
// }
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
  event_id?: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  category: string;
  startDate: Date;
  endDate: Date;
  ticketTypes: TicketType[];
  bannerUrl?: string;
  soldTickets?: number;
  totalTickets?: number;
  status: string;
  maxCapacity?: number;
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
