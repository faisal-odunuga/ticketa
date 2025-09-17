"use client";
import Button from "@/components/ui/button/Button";
import Loader from "@/components/ui/loader/Loader";
import { TicketProps } from "@/hooks/definitions";
import { getUserTicketById } from "@/services/apiTicket";
import { getFormattedDate, getTime } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineFileDownload } from "react-icons/md";

const statusColor = {
  verified: "bg-green-100 text-green-800",
  used: "bg-red-100 text-red-800",
};

const TicketPDF = () => {
  const { ticketId } = useParams();
  const { data: ticket, isLoading } = useQuery<TicketProps | null, Error>({
    queryKey: ["ticket", ticketId],
    queryFn: () => getUserTicketById(ticketId) || Promise.resolve(null),
  });

  if (!ticket && !isLoading) return <div>Ticket not found</div>;
  if (isLoading)
    return (
      <div className="w-full h-screen">
        <Loader />
      </div>
    );

  return (
    <main className="flex flex-col gap-10 items-center justify-center min-h-screen p-4 md:p-10">
      <div className="w-full mx-auto flex flex-col border-4 max-w-3xl h-full relative">
        <div className="absolute bottom-2 right-4">
          <h1 className="font-bold text-blue-600 text-sm">
            Powered by Ticketa
          </h1>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {ticket.event.title}
              </h3>
              <div
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  statusColor[ticket.is_verified ? "verified" : "used"]
                }`}
              >
                {ticket.is_verified ? "Verified" : "Not Verified"}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                ₦{ticket.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <svg className="h-4 w-4 text-gray-400"></svg>
              <div>
                <p className="font-bold text-gray-900">Event Date</p>
                <p className="text-gray-600">
                  {getFormattedDate(ticket.event.startDate)} at{" "}
                  {getTime(ticket.event.startDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <svg className="h-4 w-4 text-gray-400"></svg>
              <div>
                <p className="font-bold text-gray-900">Full Name</p>
                <p className="text-gray-600">{ticket.user_name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <svg className="h-4 w-4 text-gray-400"></svg>
              <div>
                <p className="font-bold text-gray-900">Venue</p>
                <p className="text-gray-600">{ticket.event.venue},</p>
                <p className="text-gray-600">{ticket.event.location}.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <svg className="h-4 w-4 text-gray-400"></svg>
              <div>
                <p className="font-bold text-gray-900">Ticket Type</p>
                <p className="text-gray-600">
                  {ticket.ticket_type.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-gray-400 rounded text-xs flex items-center justify-center text-white">
                #
              </div>
              <div>
                <p className="font-bold text-gray-900">Ticket Number</p>
                <p className="text-gray-600 font-mono text-sm">
                  {ticket.ticket_number}
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>
        </div>

        <div className="bg-gray-50 p-6 flex flex-col items-center justify-center border-l">
          <div className="w-52 h-52 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3">
            <div className="text-gray-400 text-center">
              <div className="w-48 h-48 bg-gray-200 rounded mx-auto flex items-center justify-center">
                <Image
                  src={ticket?.qr_code}
                  alt="QR Code"
                  width={192} // adjust as needed
                  height={192} // adjust as needed
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center">
            Show this code at the event entrance
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 no-print">
        <Button
          btnText="Download Ticket"
          hasIcon={<MdOutlineFileDownload />}
          onClick={() => window.print()}
          filled={false}
        />
        <Button
          btnText="Email Ticket"
          hasIcon={<HiOutlineMail />}
          filled={false}
        />
      </div>
    </main>
  );
};

export default TicketPDF;
