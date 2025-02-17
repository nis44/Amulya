import Link from "next/link";
import ListView from "./components/ListView";
import { Button } from "@nextui-org/react";

export default function Page() {
  return (
    <main className="flex flex-col gap-6 p-6 bg-[#F9F6F4] min-h-screen">
      <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border border-[#EBD1C4]">
        <h1 className="text-2xl font-serif font-bold text-[#5E121D] tracking-tight">
          Order Management
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button className="bg-[#5E121D] text-white px-4 py-2 rounded-lg hover:bg-[#8A1A2B] transition-colors">
              View Analytics
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#EBD1C4] overflow-hidden">
        <ListView />
      </div>
    </main>
  );
}
