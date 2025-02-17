"use client";

import { useProduct } from "@/lib/firestore/products/read";
import { useAllReview } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { Rating } from "@mui/material";
import { Avatar, Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: reviews } = useAllReview();

  return (
    <div className="grid gap-4 p-4">
      {reviews?.map((item) => (
        <ReviewCard key={item?.id} item={item} />
      ))}
    </div>
  );
}

function ReviewCard({ item }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: product } = useProduct({ productId: item?.productId });

  const handleDelete = async () => {
    if (!confirm("Permanently delete this review?")) return;
    setIsLoading(true);
    try {
      await deleteReview({ uid: item?.uid, productId: item?.productId });
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex gap-4 bg-white px-2 py-2 rounded-xl shadow-sm border border-[#EBD1C4] hover:shadow-md transition-all">
      <Avatar 
        src={item?.photoURL} 
        className="border-2 border-[#EBD1C4] w-10 h-10"
      />
      
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="font-semibold text-[#5E121D]">{item?.displayName}</h1>
            <Link 
              href={`/products/${item?.productId}`} 
              className="group inline-block"
            >
              <span className="text-sm text-[#8A1A2B] hover:underline">
                {product?.title}
              </span>
            </Link>
            <div>
              <Rating 
                value={item?.rating} 
                readOnly 
                size="small" 
              />
            </div>
          </div>
          <Button
            isIconOnly
            size="sm"
            onClick={handleDelete}
            isLoading={isLoading}
            className="bg-[#EBD1C4] text-red-600 hover:bg-red-100"
          >
            <Trash2 size={16} />
          </Button>
        </div>
        
        <p className="text-[#5E121D]/90 text-sm leading-snug">
          {item?.message}
        </p>
      </div>
    </div>
  );
}
