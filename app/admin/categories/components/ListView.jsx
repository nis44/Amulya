"use client";

import { useCategories } from "@/lib/firestore/categories/read";
import { deleteCategory } from "@/lib/firestore/categories/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: categories, error, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <CircularProgress 
          classNames={{
            svg: "w-16 h-16",
            track: "stroke-[#EBD1C4]",
            indicator: "stroke-[#5E121D]"
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F9F6F4] p-6 rounded-lg text-center text-[#5E121D] font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4 bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-4">
      <h1 className="text-2xl font-serif font-bold text-[#5E121D]">Categories</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9F6F4]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">SN</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">Image</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">Name</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-[#5E121D]">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#EBD1C4]">
            {categories?.map((item, index) => (
              <tr key={item?.id} className="hover:bg-[#F9F6F4] transition-colors">
                <td className="px-2 text-sm text-center text-[#5E121D] font-mono">
                  {index + 1}
                </td>
                
                <td className="px-4 py-2">
                  <div className="w-12 h-10 rounded-lg overflow-hidden border border-[#EBD1C4]">
                    <img 
                      className="w-full h-full object-cover"
                      src={item?.imageURL}
                      alt={item?.name}
                    />
                  </div>
                </td>
                
                <td className="px-4 py-3 text-sm text-[#5E121D] font-medium">
                  {item?.name}
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={() => router.push(`/admin/categories?id=${item?.id}`)}
                      isIconOnly
                      size="sm"
                      className="bg-green-300 text-[#5E121D] hover:bg-[#5E121D] hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </Button>
                    
                    <Button
                      onClick={async () => {
                        if (!confirm("Delete this category permanently?")) return;
                        try {
                          await deleteCategory({ id: item?.id });
                          toast.success("Category deleted successfully");
                        } catch (error) {
                          toast.error(error?.message);
                        }
                      }}
                      isIconOnly
                      size="sm"
                      className="text-[#EBD1C4] bg-red-600 hover:text-black transition-colors"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
