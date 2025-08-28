"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/ui/form-input/FormInput";
import Image from "next/image";
import {
  CustomerInfo,
  EventCardProps,
  PaystackResponse,
} from "@/hooks/definitions";
import { GrLocation } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import {
  generateTicketCode,
  getDate,
  getTime,
  SentenseCase,
} from "@/utils/helpers";
import SelectInput from "../ui/select-input/SelectInput";
import { useMemo } from "react";
import Button from "../ui/button/Button";
import { IoTicketSharp } from "react-icons/io5";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/navigation";
import { useAuth } from "@/state/AuthProvider";
import { createTicket, updateTicketCount } from "@/services/apiTicket";

interface EventInfo {
  event: EventCardProps | null;
}

export default function OrderSummary({ event }: EventInfo) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<CustomerInfo>({ mode: "onChange" });

  const router = useRouter();
  const ticket_type = watch("ticket_type");
  const email = watch("email");
  const name = watch("fullName");
  const phone = watch("number");

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const selectedTicket = useMemo(() => {
    return event?.ticketTypes.find((t) => t.name === ticket_type);
  }, [ticket_type, event]);

  const amount = selectedTicket?.price ? selectedTicket.price * 100 : 0;
  const { user } = useAuth();

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

  // const onSuccess = (reference: PaystackResponse) => {
  //   router.push(`/payment-status${reference.redirecturl}`);
  // };

  const onClose = () => {
    console.log("Payment popup closed");
  };

  const initializePayment = usePaystackPayment(config);

  const onSubmit: SubmitHandler<CustomerInfo> = (data) => {
    const payload = {
      ...data,
      price: selectedTicket?.price || 0,
      event_id: event?.event_id,
      user_id: user?.id || null,
      ticket_number: generateTicketCode(event),
      user_name: name,
      user_phone_number: phone,
    };

    if (isValid) {
      initializePayment({
        onSuccess: (reference: PaystackResponse) => {
          createTicket(payload); // ✅ creat ticket record in supabase access
          updateTicketCount(event?.event_id || "", selectedTicket?.name || ""); // ✅ update ticket quantitiy event
          router.push(`/payment-status${reference.redirecturl}`);
        },

        onClose,
      });
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <aside className="space-y-6">
            {/* Event Details */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <span>Event Details</span>
                </h3>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="flex space-x-4">
                  <Image
                    src={event?.bannerUrl || ""}
                    alt={event?.title || ""}
                    width={600}
                    height={300}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {event?.title}
                    </h3>
                    <p className="text-gray-600">
                      {SentenseCase(event?.category || "")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <CiCalendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Date &amp; Time</p>
                      <p className="font-medium">{getDate(event?.startDate)}</p>
                      <p className="text-sm text-gray-600">
                        {getTime(event?.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <GrLocation className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-medium"> {event?.venue}</p>
                      <p className="text-sm text-gray-600">
                        {" "}
                        {event?.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <IoTicketSharp />
                  <span>Ticket Details</span>
                </h3>
              </div>

              <div className="p-6 pt-0">
                <div className="space-y-3">
                  {ticket_type && selectedTicket && (
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="font-semibold">
                          {SentenseCase(ticket_type)}
                        </h1>
                        <p className="text-gray-500 text-sm">
                          ₦{selectedTicket.price.toLocaleString()} per ticket
                        </p>
                      </div>
                    </div>
                  )}

                  <SelectInput
                    label="Choose Ticket Type"
                    id="ticket_type"
                    {...register("ticket_type", {
                      required: "Select a ticket type",
                    })}
                  >
                    <option value={""} disabled>
                      Choose your ticket type
                    </option>
                    {event?.ticketTypes.map((type) => (
                      <option value={type.name} key={type.name}>
                        {SentenseCase(type.name)}
                      </option>
                    ))}
                  </SelectInput>
                  {errors.ticket_type && (
                    <p className="text-red-500 text-sm">
                      {errors.ticket_type.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Section */}
          <aside className="space-y-6">
            {/* Customer Info */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <span>Customer Information</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 px-6 pb-6">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}

                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <SelectInput
                  label="Choose your gender"
                  id="gender"
                  required
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </SelectInput>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}

                <FormInput
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  {...register("number", {
                    required: "Phone number is required",
                  })}
                />
                {errors.number && (
                  <p className="text-red-500 text-sm">
                    {errors.number.message}
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Order Total
                </h3>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex justify-between">
                  <span>{SentenseCase(ticket_type)}</span>
                  <span>₦{selectedTicket?.price.toLocaleString() || 0}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Service Fee</span>
                  <span>₦{0}</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₦{selectedTicket?.price.toLocaleString() || 0}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  btnText="Proceed to Payment"
                  disabled={!isValid}
                  className="w-full"
                  onSubmit={() => onSubmit}
                />
              </div>
            </div>
          </aside>
        </section>
      </form>
    </main>
  );
}
