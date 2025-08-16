import { dashboardMenu } from "@/app/dashboard/(links)/allLinks";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
}
const Sidebar = ({ isSidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`absolute inset-y-0 bg-white left-0 w-64 border-r shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative flex flex-col h-full justify-between overflow-y-auto z-[100] ${
        isSidebarOpen ? "translate-x-0 !z-50" : "-translate-x-full"
      } `}
    >
      <div className={`flex item-center justify-between p-4`}>
        {isSidebarOpen && (
          <span
            className="shadow-lg p-2 rounded-full md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <IoMdClose className="w-7 h-7" />
          </span>
        )}
        <h1>Ticketa</h1>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto">
        {dashboardMenu.map(({ icon: Icon, label, to }) => (
          <Link
            key={label}
            href={to}
            onClick={() => setSidebarOpen(false)}
            className={classNames({
              "w-full flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-200 font-semibold":
                true,
              "bg-blue-500 hover:bg-blue-500 text-white !font-black":
                to === pathname,
            })}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="flex flex-col p-4">
        <span>
          <button
            className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-200`}
          >
            <FaSignOutAlt className="h-6 w-6" />
            <span>Sign Out</span>
          </button>
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
