"use client";
import { useFormContext } from "react-hook-form";
import SelectInput from "@/components/ui/select-input/SelectInput";
import { IoTicketSharp } from "react-icons/io5";
import { EventCardProps } from "@/hooks/definitions";
import { SentenseCase } from "@/utils/helpers";

export default function TicketDetails({
  event,
}: {
  event: EventCardProps | null;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const ticket_type = watch("ticket_type");
  const selectedTicket = event?.ticketTypes.find((t) => t.name === ticket_type);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold flex items-center space-x-2">
          <IoTicketSharp />
          <span>Ticket Details</span>
        </h3>
      </div>

      <div className="p-6 pt-0 space-y-3">
        {ticket_type && selectedTicket && (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">{SentenseCase(ticket_type)}</h1>
              <p className="text-gray-500 text-sm">
                {selectedTicket.price === 0
                  ? "Free"
                  : `₦${selectedTicket.price.toLocaleString()} per ticket`}
              </p>
            </div>
          </div>
        )}

        <SelectInput
          label="Choose Ticket Type"
          id="ticket_type"
          {...register("ticket_type", { required: "Select a ticket type" })}
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
        {errors.ticket_type?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.ticket_type.message)}
          </p>
        )}
      </div>
    </div>
  );
}
