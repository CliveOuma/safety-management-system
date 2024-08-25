"use client"
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import BackDrop from "./BackDrop";
import Avatar from "../Avatar";
import { useUserContext } from "@/app/context/userContext";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, isExpired, signOut } = useUserContext();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border flex flex-row cursor-pointer text-slate-700 hover:shadow-md transition gap-1 rounded-full items-center"
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="rounded-md overflow-hidden w-48 bg-white shadow-md absolute right-0 top-12 text-sm flex flex-col cursor-pointer">
            {isExpired ? (
              <>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </>
            ) : (
              <>
                {role === "ADMIN" && (
                  <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                )}
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
