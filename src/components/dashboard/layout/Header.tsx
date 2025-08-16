import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  IoCartOutline,
  IoMenu,
  IoSearch,
  IoStorefrontOutline,
} from "react-icons/io5";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const Header = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  return (
    <header className="w-full sticky bg-white p-4 flex items-center md:justify-end justify-between ">
      <div
        className="shadow-lg p-2 rounded-full md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <IoMdClose className="w-7 h-7" />
        ) : (
          <IoMenu className="w-7 h-7" />
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <IoSearch className="h-6 w-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <FaRegBell className="h-6 w-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <IoCartOutline className="h-6 w-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <IoStorefrontOutline className="h-6 w-6" />
        </button>
        <Link href="/settings">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <BiUser className="h-5 w-5 text-primary" />
            </div>

            <span className="hidden text-sm font-medium text-gray-700 md:block">
              Faisal Odunuga
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
