"use client";

import { useAllOrders } from "@/lib/firestore/orders/read";
import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { useUser } from "@/lib/firestore/user/read";
import { Avatar, Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
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
    data: orders,
    error,
    isLoading,
    lastSnapDoc,
  } = useAllOrders({
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
      <div className="bg-[#F9F6F4] p-6 rounded-xl text-center text-[#5E121D] font-medium">
        {error}
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-6">
      <h1 className="text-2xl font-serif font-bold text-[#5E121D] border-b border-[#EBD1C4] pb-3">
        Order Management
      </h1>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9F6F4]">
            <tr>
              {['SN', 'Customer', 'Amount', 'Products', 'Payment', 'Status', 'Actions'].map((header, idx) => (
                <th 
                  key={header}
                  className={`px-4 py-3 text-left text-sm font-medium text-[#5E121D]
                    ${idx === 0 ? 'rounded-l-lg' : ''} 
                    ${idx === 6 ? 'rounded-r-lg' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#EBD1C4]">
            {orders?.map((item, index) => (
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
            isDisabled={lastSnapDocList?.length === 0}
            onClick={handlePrePage}
          >
            Previous
          </Button>
          <Button
            className="bg-white text-[#5E121D] border border-[#EBD1C4] hover:bg-[#EBD1C4] px-4 py-2"
            isDisabled={orders?.length === 0}
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
          {[3, 5, 10, 20, 100].map(opt => (
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
  const totalAmount = item?.checkout?.line_items?.reduce(
    (prev, curr) => prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity,
    0
  );

  const { data: user } = useUser({ uid: item?.uid });

  return (
    <tr className="hover:bg-[#F9F6F4] transition-colors">
      {/* SN */}
      <td className="px-4 py-3 text-center text-sm text-[#5E121D] font-mono">
        {index + 1}
      </td>
      
      {/* Customer */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar 
            size="sm" 
            src={user?.photoURL} 
            className="border-2 border-[#EBD1C4]"
          />
          <div>
            <p className="text-[#5E121D] font-medium">{user?.displayName || 'Guest'}</p>
            <p className="text-xs text-[#8A1A2B]">{user?.email || 'No email'}</p>
          </div>
        </div>
      </td>
      
      {/* Amount */}
      <td className="px-4 py-3 text-[#5E121D] font-medium">
        ₹{totalAmount?.toFixed(2)}
      </td>
      
      {/* Products */}
      <td className="px-4 py-3 text-[#5E121D]">
        {item?.checkout?.line_items?.length}
      </td>
      
      {/* Payment */}
      <td className="px-4 py-3">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#EBD1C4] text-[#5E121D] border border-[#5E121D]">
          {item?.paymentMode?.toUpperCase()}
        </span>
      </td>
      
      {/* Status */}
      <td className="px-4 py-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          item?.status === 'completed' 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {item?.status?.toUpperCase() || 'PENDING'}
        </span>
      </td>
      
      {/* Actions */}
      <td className="px-4 py-3">
        <Link href={`/admin/orders/${item?.id}`}>
          <Button
            size="sm"
            className="bg-[#5E121D] text-white hover:bg-[#8A1A2B] transition-colors"
          >
            View Details
          </Button>
        </Link>
      </td>
    </tr>
  );
}