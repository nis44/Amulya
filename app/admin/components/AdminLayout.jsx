"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Button, CircularProgress } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const { user } = useAuth();
  const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[#F9F6F4]">
        <CircularProgress 
          classNames={{
            svg: "w-20 h-20",
            track: "stroke-[#EBD1C4]",
            indicator: "stroke-[#5E121D]"
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-[#F9F6F4]">
        <div className="bg-[#5E121D] p-4 rounded-lg shadow-lg">
          <h1 className="text-white font-bold text-lg">{error}</h1>
        </div>
        <Button 
          className="bg-[#5E121D] text-white hover:bg-[#8A1A2B] transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-[#F9F6F4]">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-serif font-bold text-[#5E121D]">
            Unauthorized Access
          </h1>
          <p className="text-[#8A1A2B]">Logged in as: {user?.email}</p>
        </div>
        <Button
          className="bg-[#5E121D] text-white px-6 py-3 rounded-lg 
            hover:bg-[#8A1A2B] transition-colors shadow-md"
          onClick={async () => await signOut(auth)}
        >
          Secure Logout
        </Button>
      </div>
    );
  }

  return (
    <main className="relative flex bg-[#F9F6F4]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shadow-xl">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:hidden transform transition-transform duration-300 
          ease-[cubic-bezier(0.4,0,0.2,1)] z-50 shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#EBD1C4]/50 z-40 md:hidden" 
             onClick={toggleSidebar} />
      )}

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <section className="pt-14 flex-1 bg-[#FFF] md:bg-[#F9F6F4]">
          <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
            {children}
          </div>
        </section>
      </section>
    </main>
  );
}
