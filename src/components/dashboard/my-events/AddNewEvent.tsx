import Button from "@/components/ui/button/Button";
import { ToggleFormProps } from "@/hooks/definitions";
import { FiPlus } from "react-icons/fi";

export default function AddNewEvent({ setShowForm }: ToggleFormProps) {
  return (
    <section className="p-8 text-center bg-white rounded-2xl shadow">
      <header>
        <FiPlus size={40} className="text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Your Next Event
        </h2>
      </header>

      <p className="text-gray-600 mb-6">
        Ready to bring people together? Create a new event and start selling
        tickets in minutes.
      </p>

      <Button
        btnText="Create New Event"
        hasIcon={<FiPlus size={20} />}
        onClick={() => setShowForm(true)}
      />
    </section>
  );
}
