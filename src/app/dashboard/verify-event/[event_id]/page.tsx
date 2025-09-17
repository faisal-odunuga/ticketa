"use client";
import { TicketProps } from "@/hooks/definitions";
import { getEventTickets, verifyTicket } from "@/services/apiEvents";
import { useAuth } from "@/state/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
// import { useVerifyTicket } from "@/hooks/useVerifyTicket"; // 👈 import hook
import React from "react";
import { toast } from "react-toastify";

const VerifyTicket = () => {
  const { user, loading: authLoading } = useAuth();
  const { event_id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: tickets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event-tickets", event_id],
    queryFn: () => getEventTickets(String(event_id)),
    enabled: !!user && !authLoading,
  });

  const { mutate: verify, isPending } = useMutation({
    mutationFn: (ticketId: string) => verifyTicket(ticketId),
    onSuccess: (data) => {
      // update cached tickets if already fetched
      // Alternatively, you can directly update the local tickets state if needed
      // setTickets((prevTickets) =>
      //   prevTickets.map((ticket) =>
      //     ticket.ticket_id === data.ticket_id
      //       ? { ...ticket, is_verified: true }
      //       : ticket
      //   )
      // );
      toast.success("Ticket verified successfully");
    },
    onError: (error) => {
      console.error("Verification failed:", error);
    },
  }); // 👈 use mutation

  if (isLoading) return <div>Loading tickets...</div>;

  return (
    <section className="p-8 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Verify Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found for this event.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id} className="border-t">
                <td className="p-3">{ticket.user_name}</td>
                <td className="p-3">{ticket.user_phone_number}</td>
                <td className="p-3">
                  {ticket.is_verified ? (
                    <span className="text-green-600 font-semibold">
                      Verified
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-3">
                  {!ticket.is_verified ? (
                    <button
                      onClick={() => verify(ticket.ticket_id)} // 👈 call mutation
                      disabled={isPending}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {isPending ? "Verifying..." : "Verify"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                    >
                      Verified
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default VerifyTicket;
