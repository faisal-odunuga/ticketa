import { UserWithProfile } from "@/hooks/definitions";
import { getInitials } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { IoMenu, IoSearch } from "react-icons/io5";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  user: UserWithProfile;
}
const Header = ({ isSidebarOpen, toggleSidebar, user }: SidebarProps) => {
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
        <Link href="/settings">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center relative">
              {user.profile?.image ? (
                <Image
                  src={user.profile?.image || ""}
                  alt={user.profile?.name || ""}
                  fill
                  sizes="100%"
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-blue-600">
                  {getInitials(user.profile?.name || "")}
                </span>
              )}
              <span className="text-lg font-bold text-blue-600">
                {getInitials(user.profile?.name || "")}
              </span>
            </div>

            <span className="hidden text-sm font-medium text-gray-700 md:block">
              {user.profile?.name}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
