"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const [pageLimit, setPageLimit] = useState(10);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(() => {
    setLastSnapDocList([]);
  }, [pageLimit]);

  const {
    data: products,
    error,
    isLoading,
    lastSnapDoc,
  } = useProducts({
    pageLimit: pageLimit,
    lastSnapDoc:
      lastSnapDocList?.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  });

  const handleNextPage = () => {
    let newStack = [...lastSnapDocList];
    newStack.push(lastSnapDoc);
    setLastSnapDocList(newStack);
  };

  const handlePrePage = () => {
    let newStack = [...lastSnapDocList];
    newStack.pop();
    setLastSnapDocList(newStack);
  };

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
      <div className="bg-[#F9F6F4] p-6 rounded-xl text-center">
        <p className="text-[#5E121D] font-medium">{error}</p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col gap-4 rounded-xl w-full">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["SN", "Image", "Product", "Price", "Stock", "Orders", "Status", "Actions"].map((header, idx) => (
                <th
                  key={header}
                  className={`px-4 py-3 text-left text-sm font-serif font-bold text-[#5E121D] bg-[#F9F6F4]
                    ${idx === 0 ? "rounded-l-lg" : ""} 
                    ${idx === 7 ? "rounded-r-lg" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="space-y-2">
            {products?.map((item, index) => (
              <Row
                key={item?.id}
                item={item}
                index={index + lastSnapDocList?.length * pageLimit}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4 py-3 bg-[#F9F6F4] rounded-lg">
        <div className="flex gap-2">
          <Button
            className="bg-white text-[#5E121D] border border-[#EBD1C4] hover:bg-[#EBD1C4] px-4 py-2"
            isDisabled={isLoading || lastSnapDocList?.length === 0}
            onClick={handlePrePage}
          >
            Previous
          </Button>
          <Button
            className="bg-white text-[#5E121D] border border-[#EBD1C4] hover:bg-[#EBD1C4] px-4 py-2"
            isDisabled={isLoading || products?.length === 0}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
        
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(Number(e.target.value))}
          className="bg-white border border-[#EBD1C4] text-[#5E121D] rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#5E121D]"
        >
          {[3, 5, 10, 20, 100].map((opt) => (
            <option key={opt} value={opt} className="text-[#5E121D]">
              Show {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    setIsDeleting(true);
    try {
      await deleteProduct({ id: item?.id });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => {
    router.push(`/admin/products/form?id=${item?.id}`);
  };

  return (
    <tr className="group hover:bg-[#F9F6F4] transition-colors">
      {/* SN */}
      <td className="px-4 py-3 text-[#5E121D] font-medium">{index + 1}</td>
      
      {/* Image */}
      <td className="px-4 py-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#EBD1C4]">
          <img
            className="w-full h-full object-cover"
            src={item?.featureImageURL}
            alt={item?.title}
          />
        </div>
      </td>
      
      {/* Title */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[#5E121D] font-medium">{item?.title}</span>
          {item?.isFeatured && (
            <span className="bg-[#5E121D] text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
      </td>
      
      {/* Price */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          {item?.salePrice < item?.price && (
            <span className="text-xs text-[#8A1A2B] line-through">
              ₹{item?.price}
            </span>
          )}
          <span className="text-[#5E121D] font-medium">
            ₹{item?.salePrice}
          </span>
        </div>
      </td>
      
      {/* Stock */}
      <td className="px-4 py-3 text-[#5E121D]">{item?.stock}</td>
      
      {/* Orders */}
      <td className="px-4 py-3 text-[#5E121D]">{item?.orders ?? 0}</td>
      
      {/* Status */}
      <td className="px-4 py-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          item?.stock - (item?.orders ?? 0) > 0 
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
          {item?.stock - (item?.orders ?? 0) > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </td>
      
      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Button
            onClick={handleUpdate}
            isIconOnly
            className="bg-[#EBD1C4] text-[#5E121D] hover:bg-[#5E121D] hover:text-white"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isIconOnly
            className="bg-[#EBD1C4] text-red-600 hover:bg-red-100"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
