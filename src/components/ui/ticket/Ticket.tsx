import { TicketProps } from "@/hooks/definitions";
import { getFormattedDate, getTime } from "@/utils/helpers";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineFileDownload } from "react-icons/md";
import Button from "../button/Button";
import Link from "next/link";
import Image from "next/image";

const statusColor = {
  valid: "bg-green-100 text-green-800",
  used: "bg-red-100 text-red-800",
};
const TicketCard = ({ ticket }: { ticket: TicketProps }) => {
  return (
    <div className="flex flex-col lg:flex-row bg-white">
      <div className="flex-1 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {ticket.event.title}
            </h3>
            <div
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                statusColor[ticket.is_verified ? "used" : "valid"]
              }`}
            >
              {ticket.is_verified ? "Used" : "Valid"}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {ticket.price === 0
                ? "Free"
                : `₦${ticket.price.toLocaleString()}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <svg className="h-4 w-4 text-gray-400"></svg>
            <div>
              <p className="font-medium text-gray-900">Event Date</p>
              <p className="text-gray-600">
                {getFormattedDate(ticket.event.startDate)} at{" "}
                {getTime(ticket.event.startDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <svg className="h-4 w-4 text-gray-400"></svg>
            <div>
              <p className="font-medium text-gray-900">Venue</p>
              <p className="text-gray-600">{ticket.event.venue},</p>
              <p className="text-gray-600">{ticket.event.location}.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <svg className="h-4 w-4 text-gray-400"></svg>
            <div>
              <p className="font-medium text-gray-900">Ticket Type</p>
              <p className="text-gray-600">
                {ticket.ticket_type.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-gray-400 rounded text-xs flex items-center justify-center text-white">
              ₦
            </div>
            <div>
              <p className="font-medium text-gray-900">Ticket Number</p>
              <p className="text-gray-600 font-mono text-sm">
                {ticket.ticket_number}
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/download-ticket/${ticket.ticket_id}`}>
            <Button
              btnText="Download Ticket"
              hasIcon={<MdOutlineFileDownload />}
              filled={false}
            />
          </Link>

          <Button
            btnText="Email Ticket"
            hasIcon={<HiOutlineMail />}
            filled={false}
          />
          <Link href={`/event-details/${ticket.event.event_id}`}>
            <Button btnText=" View Event Details" />
          </Link>
        </div>
      </div>

      <div className="lg:w-48 bg-gray-50 p-6 flex flex-col items-center justify-center border-l">
        <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3">
          <div className="text-gray-400 text-center">
            <div className="w-30 h-30 bg-gray-200 rounded mx-auto">
              <Image
                src={ticket?.qr_code || null}
                alt="QR Code"
                width={100}
                height={100}
              />
            </div>
            <p className="text-xs">QR Code</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 text-center">
          Show this code at the event entrance
        </p>
      </div>
    </div>
  );
};

export default TicketCard;
