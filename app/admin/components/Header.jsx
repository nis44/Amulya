"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Avatar } from "@nextui-org/react";
import { Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  const { user } = useAuth();
  const { data: admin } = useAdmin({ email: user?.email });
  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-[#F9F6F4] border-b-2 border-[#EBD1C4] px-4 py-2.5 z-50">
      <div className="flex justify-center items-center md:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-[#EBD1C4] transition-colors"
        >
          <Menu className="w-6 h-6 text-[#5E121D] stroke-[1.5]" />
        </button>
      </div>
      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
        <h1 className="text-2xl font-serif font-bold text-[#5E121D] tracking-tight">
          Dashboard
        </h1>
        <div className="flex gap-3 items-center">
          <div className="md:flex flex-col items-end hidden">
            <h1 className="text-base font-semibold text-[#5E121D]">
              {admin?.name}
            </h1>
            <h1 className="text-sm text-[#8A1A2B]/80 tracking-tight">
              {admin?.email}
            </h1>
          </div>
          <div className="relative">
            <Avatar 
              size="md"
              src={admin?.imageURL}
              className="border-2 border-[#EBD1C4] hover:border-[#5E121D] transition-colors"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#5E121D] rounded-full border-2 border-[#F9F6F4]" />
          </div>
        </div>
      </div>
    </section>

  );
}
