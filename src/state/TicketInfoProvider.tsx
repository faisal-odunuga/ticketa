// context/TicketsContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserTickets } from "@/services/apiTicket";
import { useAuth } from "@/hooks/useAuth";
import { UserWithProfile, TicketProps } from "@/hooks/definitions";

interface TicketsContextType {
  user: UserWithProfile | null;
  tickets: TicketProps[];
  ticketCount: number;
  isLoading: boolean;
  authLoading: boolean;
  amountSpent: number;

  refetch: () => void;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketInfoProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tickets", user?.id],
    queryFn: () => getUserTickets(user!.id),
    enabled: !!user && !authLoading,
  });

  const amountSpent = tickets.reduce((acc, ticket) => {
    return acc + ticket.price;
  }, 0);

  const value: TicketsContextType = {
    user,
    tickets,
    ticketCount: tickets.length,
    isLoading,
    refetch,
    authLoading,
    amountSpent,
  };

  return (
    <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketsProvider");
  }
  return context;
};
