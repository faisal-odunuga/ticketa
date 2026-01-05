"use client";
import Button from "@/components/ui/button/Button";
import { SentenseCase } from "@/utils/helpers";
import { EventCardProps } from "@/hooks/definitions";

interface Props {
  selectedTicket?: EventCardProps["ticketTypes"][0];
  ticket_type?: string;
  isValid: boolean;
}

export default function OrderSummaryBox({
  selectedTicket,
  ticket_type,
  isValid,
}: Props) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold">Order Total</h3>
      </div>

      <div className="p-6 pt-0 space-y-3">
        <div className="flex justify-between">
          <span>{SentenseCase(ticket_type || "")}</span>
          <span>
            {selectedTicket?.price === 0
              ? "Free"
              : `₦${selectedTicket?.price.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Service Fee</span>
          <span>₦0</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>
              {selectedTicket?.price === 0
                ? "Free"
                : `₦${selectedTicket?.price.toLocaleString()}`}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          btnText="Proceed to Payment"
          disabled={!isValid}
          className="w-full"
        />
      </div>
    </div>
  );
}
