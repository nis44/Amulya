"use client";

import { useAdmins } from "@/lib/firestore/admins/read";
import { deleteAdmin } from "@/lib/firestore/admins/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: admins, error, isLoading } = useAdmins();

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
        Admin Management
      </h1>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9F6F4]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D] rounded-l-lg">SN</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">Profile</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#5E121D]">Details</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-[#5E121D] rounded-r-lg">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#EBD1C4]">
            {admins?.map((item, index) => (
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
    if (!confirm("Permanently delete this admin?")) return;
    setIsDeleting(true);
    try {
      await deleteAdmin({ id: item?.id });
      toast.success("Admin deleted successfully");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => router.push(`/admin/admins?id=${item?.id}`);

  return (
    <tr className="hover:bg-[#F9F6F4] transition-colors">
      <td className="px-4 py-3 text-center text-sm text-[#5E121D] font-mono">
        {index + 1}
      </td>
      
      <td className="px-4 py-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#EBD1C4]">
          <img
            className="w-full h-full object-cover"
            src={item?.imageURL}
            alt={item?.name}
          />
        </div>
      </td>
      
      <td className="px-4 py-3">
        <p className="text-[#5E121D] font-medium">{item?.name}</p>
        <p className="text-sm text-[#8A1A2B]">{item?.email}</p>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex gap-2 justify-center">
          <Button
            onClick={handleUpdate}
            isIconOnly
            size="sm"
            className="bg-green-300 text-[#5E121D] hover:bg-[#5E121D] hover:text-white"
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
