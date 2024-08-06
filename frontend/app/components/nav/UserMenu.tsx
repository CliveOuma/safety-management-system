"use client";
import { useCallback, useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import BackDrop from "./BackDrop";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: string;
  exp: number; // Add expiration property
}

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    setRole(null);
    setIsExpired(true); // Mark as expired
    router.push("/login");
  };

  const fetchRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token without verification (server-side verification should be done separately)
        const decoded = jwt.decode(token) as DecodedToken;

        // Check if token is expired
        if (decoded.exp < Date.now() / 1000) {
          setRole(null);
          setIsExpired(true);
        } else {
          setRole(decoded.role);
          setIsExpired(false);
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        setRole(null);
        setIsExpired(true);
      }
    } else {
      setRole(null);
      setIsExpired(true);
    }
  };

  useEffect(() => {
    fetchRole();

    // Add event listener for storage changes to detect logout in other tabs
    window.addEventListener("storage", fetchRole);

    return () => {
      window.removeEventListener("storage", fetchRole);
    };
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
