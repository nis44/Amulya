import Link from "next/link";
import ListView from "./components/ListView";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <main className="flex flex-col gap-6 p-6 bg-[#F9F6F4] min-h-screen">
      <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-sm border border-[#EBD1C4]">
        <h1 className="text-2xl font-serif font-bold text-[#5E121D] tracking-tight">
          Product Catalog
        </h1>
        <Link href={`/admin/products/form`}>
          <button className="bg-[#5E121D] text-white px-5 py-2.5 rounded-lg
            hover:bg-[#8A1A2B] transition-all duration-200 flex items-center gap-2
            shadow-md hover:shadow-lg">
            <Plus className="w-5 h-5 stroke-[1.5]" />
            <span className="text-sm font-medium">Add Product</span>
          </button>
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-4">
        <ListView />
      </div>
    </main>
  );
}
