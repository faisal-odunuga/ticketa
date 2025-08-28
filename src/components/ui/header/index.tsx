"use client";
import { useAuth } from "@/state/AuthProvider";
import React from "react";
import Logo from "../logo/Logo";
import Button from "../button/Button";
import Link from "next/link";

const Header = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-20">
      <Logo />
      <div>
        <Link href={user ? "/dashboard" : "/login"}>
          {isLoggedIn ? (
            <Button btnText="Dashboard" />
          ) : (
            <Button btnText="Login" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
