"use client";

import { useCollections } from "@/lib/firestore/collections/read";
import { deleteCollection } from "@/lib/firestore/collections/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: collections, error, isLoading } = useCollections();

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
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
      <div className="bg-[#F9F6F4] p-6 rounded-xl text-center text-[#5E121D] font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-6">
      <h1 className="text-2xl font-serif font-bold text-[#5E121D] border-b border-[#EBD1C4] pb-3">
        Collections
      </h1>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9F6F4]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D] rounded-l-lg">SN</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">Image</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">Collection</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">Items</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-[#5E121D] rounded-r-lg">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#EBD1C4]">
            {collections?.map((item, index) => (
              <Row key={item?.id} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Permanently delete this collection?")) return;
    setIsDeleting(true);
    try {
      await deleteCollection({ id: item?.id });
      toast.success("Collection deleted successfully");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => router.push(`/admin/collections?id=${item?.id}`);

  return (
    <tr className="hover:bg-[#F9F6F4] transition-colors">
      <td className="px-4 py-3 text-center text-sm text-[#5E121D] font-mono">
        {index + 1}
      </td>
      
      <td className="px-4 py-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#EBD1C4]">
          <img 
            className="w-full h-full object-cover" 
            src={item?.imageURL} 
            alt={item?.title}
          />
        </div>
      </td>
      
      <td className="px-4 py-3">
        <p className="text-[#5E121D] font-medium">{item?.title}</p>
        <p className="text-sm text-[#8A1A2B]">{item?.subTitle}</p>
      </td>
      
      <td className="px-4 py-3 text-[#5E121D]">
        <span className="bg-[#EBD1C4] px-2.5 py-1 rounded-full text-sm">
          {item?.products?.length} products
        </span>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex gap-2 justify-center">
          <Button
            onClick={handleUpdate}
            isIconOnly
            size="sm"
            className="bg-green-400 text-[#5E121D] hover:bg-[#5E121D] hover:text-white"
          >
            <Edit2 size={16} />
          </Button>
          
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isIconOnly
            size="sm"
            className="text-[#EBD1C4] bg-red-600 hover:text-black"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
