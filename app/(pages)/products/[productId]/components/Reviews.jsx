"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { useUser } from "@/lib/firestore/user/read";
import { Rating } from "@mui/material";
import { Avatar, Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiUser } from "react-icons/fi";
import moment from "moment";

export default function Reviews({ productId }) {
  const { data } = useReviews({ productId });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { data: userData } = useUser({ uid: user?.uid });

  const handleDelete = async (reviewId) => {
    if (!confirm("Permanently delete this review?")) return;
    setIsLoading(true);
    try {
      await deleteReview({ uid: user?.uid, productId, reviewId });
      toast.success("Review deleted", {
        icon: '🗑️',
        style: {
          background: '#5E121D',
          color: '#FFF',
          border: '1px solid #EBD1C4'
        }
      });
    } catch (error) {
      toast.error(error?.message, {
        style: {
          background: '#FEE2E2',
          color: '#B91C1C',
          border: '1px solid #FECACA'
        }
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-[#EBD1C4]">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-serif font-medium text-[#2D1C14]">
          Customer Experiences
        </h2>
        <span className="text-[#5E121D]/70">({data?.length})</span>
      </div>

      {data?.length === 0 ? (
        <div className="text-center py-12 text-[#5E121D]/60">
          No reviews yet. Be the first to share your experience!
        </div>
      ) : (
        <div className="grid gap-6">
          {data?.map((item) => (
            <div 
              key={item.id}
              className="group relative p-2 bg-[#F9F6F4] rounded-xl border border-[#EBD1C4] hover:border-[#5E121D]/30 transition-colors"
            >
              <div className="flex gap-2">
                {/* Avatar */}
                <Avatar 
                  src={item.photoURL} 
                  icon={<FiUser className="w-6 h-6 text-[#5E121D]/50"/>}
                  className="border-2 border-[#EBD1C4] w-12 h-12"
                />

                {/* Content */}
                <div className="flex-1 space-y-1">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#2D1C14]">
                        {item.displayName}
                      </h3>
                      <span className="text-sm text-[#5E121D]/70">
                        {moment(item.timestamp?.toDate()).format('MMMM D, YYYY')}
                      </span>
                    </div>
                    
                    {/* Delete Button */}
                    {user?.uid === item.uid && (
                      <Button
                        isIconOnly
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        isDisabled={isLoading}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm"
                      >
                        <Trash2 className="w-4 h-4 text-[#5E121D]" />
                      </Button>
                    )}
                  </div>

                  {/* Rating */}
                  <Rating
                    value={item.rating}
                    readOnly
                    icon={<span className="text-2xl text-[#D4AF37]">★</span>}
                    emptyIcon={<span className="text-2xl text-[#EBD1C4]">★</span>}
                  />

                  {/* Review Text */}
                  <p className="text-[#5E121D]/90 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>

              {/* Verified Purchase Badge */}
              {item.verifiedPurchase && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-sm text-[#5E121D]/70">
                  <span className="text-[#D4AF37]">★</span>
                  Verified Purchase
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
