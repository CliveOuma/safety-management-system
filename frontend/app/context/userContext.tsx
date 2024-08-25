"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

interface UserContextProps {
  role: string | null;
  isExpired: boolean;
  setRole: (role: string | null) => void;
  setIsExpired: (expired: boolean) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("token");
    setRole(null);
    setIsExpired(true);
    router.push("/login");
  };

  useEffect(() => {
    const fetchRole = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwt.decode(token) as { role: string; exp: number };
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

    fetchRole();
    window.addEventListener("storage", fetchRole);
    return () => {
      window.removeEventListener("storage", fetchRole);
    };
  }, []);

  return (
    <UserContext.Provider value={{ role, isExpired, setRole, setIsExpired, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
