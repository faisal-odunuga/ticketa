import { StatProp } from "@/hooks/definitions";
import Card from "@/components/ui/card/Card";

const Stats: React.FC<StatProp> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(({ title, desc, Icon }, index) => (
        <Card key={index}>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <Icon size={35} className="text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {title.toLocaleString()}
                </p>
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
