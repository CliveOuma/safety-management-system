import { Inter } from "next/font/google";
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/nav/Navbar';
import { UserProvider } from "./context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "safety management system",
  description: "To manage incidents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Navbar />
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
