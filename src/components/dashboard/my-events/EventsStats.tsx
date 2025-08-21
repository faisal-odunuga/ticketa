import Loader from "@/components/ui/loader/Loader";
import Stats from "@/components/ui/stats/Stats";
import { useUserEvents } from "@/state/EventsContext";
import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { SlPeople } from "react-icons/sl";
import { TbCurrencyNaira } from "react-icons/tb";

const EventStats = () => {
  const { eventCount, isLoading } = useUserEvents();
  const data = [
    { title: eventCount, desc: "Total Events", Icon: CiCalendarDate },
    { title: 4802, desc: "Total Attendees", Icon: SlPeople },
    { title: 50000, desc: "Total Revenue", Icon: TbCurrencyNaira },
  ];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Stats data={data} />
    </div>
  );
};

export default EventStats;
