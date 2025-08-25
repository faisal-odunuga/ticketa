"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/ui/form-input/FormInput";
import Image from "next/image";
import { EventCardProps } from "@/hooks/definitions";
import { GrLocation } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { getDate, getTime, SentenseCase } from "@/utils/helpers";
import SelectInput from "../ui/select-input/SelectInput";
import { useMemo } from "react";
import Button from "../ui/button/Button";
import { useAuth } from "@/hooks/useAuth";
import { IoTicketSharp } from "react-icons/io5";

interface CustomerInfo {
  fullName: string;
  email: string;
  gender: string;
  ticket_type: string;
  price: number;
  number: number;
}

export default function OrderSummary({
  event,
}: {
  event: EventCardProps | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CustomerInfo>();

  const ticket_type = watch("ticket_type");
  const selectedTicket = useMemo(() => {
    return event?.ticketTypes.find((t) => t.name === ticket_type);
  }, [ticket_type, event]);
  const { user } = useAuth();
  const onSubmit: SubmitHandler<CustomerInfo> = (data) => {
    const payload = {
      ...data,
      price: selectedTicket?.price || 0,
      user_id: user?.id,
    };
    console.log("Customer Info:", payload);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <aside className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <span>Event Details</span>
                </h3>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="flex space-x-4">
                  <Image
                    src={event.bannerUrl || ""}
                    alt={event.title || ""}
                    width={600}
                    height={300}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">
                      {SentenseCase(event.category)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <CiCalendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Date &amp; Time</p>
                      <p className="font-medium">{getDate(event.startDate)}</p>
                      <p className="text-sm text-gray-600">
                        {getTime(event.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <GrLocation className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-medium"> {event.venue}</p>
                      <p className="text-sm text-gray-600"> {event.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <IoTicketSharp />

                  <span>Ticket Quantity</span>
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
                          ₦ {selectedTicket.price.toLocaleString()} per ticket
                        </p>
                      </div>
                    </div>
                  )}

                  {errors.ticket_type && (
                    <p className="text-red-500 text-sm">
                      {errors.ticket_type.message}
                    </p>
                  )}
                  <SelectInput
                    name="type"
                    id="type"
                    {...register("ticket_type", {
                      required: "Select a ticket type",
                    })}
                  >
                    <option value={""} disabled>
                      Choose your ticket type
                    </option>
                    {event.ticketTypes.map((type) => (
                      <option value={type.name} key={type.name}>
                        {SentenseCase(type.name)}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </div>
            </div>
          </aside>

          <aside className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <span>Event Details</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 px-6 pb-6">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required={true}
                  {...register("fullName")}
                />

                <FormInput
                  label="Email Address"
                  type={"email"}
                  name="email"
                  placeholder="Enter your email address"
                  required={true}
                  {...register("email")}
                />

                <SelectInput
                  label={"Choose your gender"}
                  name="gender"
                  id="gender"
                  required={true}
                  {...register("gender")}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </SelectInput>

                <FormInput
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  required={true}
                  {...register("number")}
                />
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Order Total
                </h3>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex justify-between">
                  <span>{ticket_type}</span>
                  <span>₦ {selectedTicket?.price}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Service Fee</span>
                  <span>₦ {0}</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₦ {selectedTicket?.price}</span>
                  </div>
                </div>

                <Button btnText="Proceed to Payment" className="w-full" />
              </div>
            </div>
          </aside>
        </section>
      </form>
    </main>
  );
}
