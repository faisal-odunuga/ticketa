import { BiUser } from "react-icons/bi";
import { IoTicketSharp } from "react-icons/io5";

export const dashboardMenu = [
  {
    icon: IoTicketSharp,
    label: "Tickets",
    to: "/dashboard",
  },
  {
    icon: IoTicketSharp,
    label: "View My Events",
    to: " my-events",
  },
  {
    icon: BiUser,
    label: "Settings",
    to: "/settings",
  },
];
