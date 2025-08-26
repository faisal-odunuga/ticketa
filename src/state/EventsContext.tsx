// context/UserEventsContext.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserEvents, getEventsCategories } from "@/services/apiEvents";
import { EventCardProps } from "@/hooks/definitions";
import { useAuth } from "./AuthProvider";

interface UserEventsContextType {
  events: EventCardProps[];
  eventCount: number;
  isLoadingEvents: boolean;
  refetchEvents: () => void;
  categories: string[];
  isLoadingCategories: boolean;
  refetchCategories: () => void;
}

const UserEventsContext = createContext<UserEventsContextType | undefined>(
  undefined
);

export const UserEventsProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();

  // ✅ User events query
  const {
    data: events = [],
    isLoading: isLoadingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["user-events", user?.id],
    queryFn: () => getUserEvents(user!.id),
    enabled: !!user && !authLoading,
  });

  // ✅ Categories query
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getEventsCategories,
  });

  const value: UserEventsContextType = {
    events,
    eventCount: events.length,
    isLoadingEvents,
    refetchEvents,
    categories,
    isLoadingCategories,
    refetchCategories,
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
