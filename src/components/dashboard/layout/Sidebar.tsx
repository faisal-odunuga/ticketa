import Logo from "@/components/ui/logo/Logo";
import { dashboardMenu } from "@/lib/allLinks";
import { signOut } from "@/services/apiAuth";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const handleLogout = () => {
    const error = signOut();
    if (error) toast.error(error);
    redirect("/login");
    // setSidebarOpen(false);
  };

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
        <Logo />
      </div>
      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto">
        {dashboardMenu.map(({ icon: Icon, label, to }) => (
          <Link
            key={label}
            href={to}
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg ${
              to === pathname
                ? "bg-blue-500 hover:bg-blue-500 text-white !font-black"
                : "text-black hover:bg-gray-200 hover:text-black hover:font-semibold"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="flex flex-col p-4" onClick={handleLogout}>
        <button
          className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-200`}
        >
          <FaSignOutAlt className="h-6 w-6" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
