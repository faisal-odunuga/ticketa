import { useAuth } from "@/hooks/useAuth";
import React from "react";

const Header = () => {
  // const { user, isLoggedIn } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <h1>Ticketa</h1>
      {/* <div>{isLoggedIn}</div> */}
    </div>
  );
};

export default Header;
