// context/UserEventsContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth"; // define proper EventProps type
import { getUserEvents } from "@/services/apiEvents";
import { EventCardProps } from "@/hooks/definitions";

interface UserEventsContextType {
  events: EventCardProps[];
  eventCount: number;
  isLoading: boolean;
  refetch: () => void;
}

const UserEventsContext = createContext<UserEventsContextType | undefined>(
  undefined
);

export const UserEventsProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-events", user?.id],
    queryFn: () => getUserEvents(user!.id),
    enabled: !!user && !authLoading,
  });

  const value: UserEventsContextType = {
    events,
    eventCount: events.length,
    isLoading,
    refetch,
  };

  return (
    <UserEventsContext.Provider value={value}>
      {children}
    </UserEventsContext.Provider>
  );
};

export const useUserEvents = () => {
  const context = useContext(UserEventsContext);
  if (!context) {
    throw new Error("useUserEvents must be used within a UserEventsProvider");
  }
  return context;
};
