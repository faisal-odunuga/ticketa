import Card from "@/components/ui/card/Card";
import { CiCalendarDate } from "react-icons/ci";
import { LuTicket } from "react-icons/lu";
import { TbCurrencyNaira } from "react-icons/tb";

const Stats = () => {
  const data = [
    { title: "1", desc: "Total Tickets", Icon: LuTicket },
    { title: "2", desc: "Upcoming Events", Icon: CiCalendarDate },
    { title: "500", desc: "Upcoming Events", Icon: TbCurrencyNaira },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {data.map(({ title, desc, Icon }, index) => (
        <Card key={index}>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <Icon size={35} className="text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{title}</p>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Stats;
