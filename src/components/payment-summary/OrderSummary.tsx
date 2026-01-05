"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { usePaystackPayment } from "react-paystack";

import {
  CustomerInfo,
  EventCardProps,
  PaystackResponse,
} from "@/hooks/definitions";

import { generateTicketCode } from "@/utils/helpers";
import { useAuth } from "@/state/AuthProvider";
import { purchaseTicket } from "@/services/apiTicket";

import EventDetails from "./EventDetails";
import TicketDetails from "./TicketDetails";
import CustomerInfoForm from "./CustomerInfoForm";
import OrderSummaryBox from "./OrderSummaryBox";

interface EventInfo {
  event: EventCardProps | null;
}

export default function OrderSummary({ event }: EventInfo) {
  const methods = useForm<CustomerInfo>({ mode: "onChange" });
  const {
    watch,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const router = useRouter();
  const { user } = useAuth();

  const ticket_type = watch("ticket_type");
  const email = watch("email");
  const name = watch("fullName");
  const phone = watch("number");

  const selectedTicket = useMemo(() => {
    return event?.ticketTypes.find((t) => t.name === ticket_type);
  }, [ticket_type, event]);

  const amount = selectedTicket?.price ? selectedTicket.price * 100 : 0;
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const config = {
    email,
    amount,
    publicKey,
    metadata: {
      customer_name: name,
      customer_phone: phone,
      event_name: event?.title,
      custom_fields: [
        {
          display_name: "Order ID",
          variable_name: "order_id",
          value: "ORD-12345",
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const onClose = () => {
    toast.error("Payment cancelled!");
  };

  const onSubmit: SubmitHandler<CustomerInfo> = async (data) => {
    const payload = {
      ...data,
      price: selectedTicket?.price || 0,
      event_id: event?.event_id,
      user_id: user?.id || null,
      ticket_number: generateTicketCode(event),
      user_name: name,
      user_phone_number: phone?.toString(),
    };

    if (!isValid) return;

    // Free ticket flow
    if (selectedTicket?.price === 0) {
      try {
        const ticket = await purchaseTicket(payload, selectedTicket, event);
        router.push(`/download-ticket/${ticket.ticket_id}`);
      } catch (error) {
        console.error(error);
        toast.error("Could not create free ticket.");
      }
      return;
    }

    // Paid ticket flow
    initializePayment({
      onSuccess: async (reference: PaystackResponse) => {
        try {
          const ticket = await purchaseTicket(payload, selectedTicket, event);
          router.push(
            `/payment-status?trxref=${reference.reference}&reference=${reference.reference}&ticketId=${ticket.ticket_id}`
          );
        } catch (error) {
          console.error(error);
          toast.error("Could not finalize ticket purchase.");
        }
      },
      onClose,
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <aside className="space-y-6">
              <EventDetails event={event} />
              <TicketDetails event={event} />
            </aside>
            <aside className=" space-y-6">
              <CustomerInfoForm />

              <OrderSummaryBox
                selectedTicket={selectedTicket}
                ticket_type={ticket_type}
                isValid={isValid}
              />
            </aside>
          </section>
        </form>
      </FormProvider>
    </main>
  );
}
