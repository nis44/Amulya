"use client";

import { useAuth } from "@/contexts/AuthContext";
import { addReview } from "@/lib/firestore/reviews/write";
import { useUser } from "@/lib/firestore/user/read";
import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3, FiStar } from "react-icons/fi";

export default function AddReview({ productId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { data: userData } = useUser({ uid: user?.uid });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!user) throw new Error("Please sign in to submit a review");
      if (rating === 0) throw new Error("Please select a rating");
      if (message.length < 10) throw new Error("Review must be at least 10 characters");

      await addReview({
        displayName: userData?.displayName,
        message: message,
        photoURL: userData?.photoURL,
        productId: productId,
        rating: rating,
        uid: user?.uid,
      });
      
      setMessage("");
      setRating(0);
      toast.success("Review submitted successfully!", {
        icon: '🌟',
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
        <FiEdit3 className="w-6 h-6 text-[#5E121D]" />
        <h2 className="text-2xl font-serif font-medium text-[#2D1C14]">
          Share Your Experience
        </h2>
      </div>

      <div className="space-y-6">
        {/* Rating Section */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-[#5E121D]">
            How would you rate this product?
          </label>
          <div className="flex items-center gap-4">
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              icon={<FiStar className="w-8 h-8 text-[#D4AF37]" />}
              emptyIcon={<FiStar className="w-8 h-8 text-[#EBD1C4]" />}
              size="large"
            />
            <span className="text-lg font-medium text-[#5E121D]">
              {rating}/5
            </span>
          </div>
        </div>

        {/* Review Input */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-[#5E121D]">
            Your Detailed Review
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts on craftsmanship, quality, and overall experience..."
            className="w-full px-4 py-3 rounded-lg border border-[#EBD1C4] focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#A68A7B] resize-none min-h-[150px]"
          />
          <div className="flex justify-between text-sm text-[#5E121D]/80">
            <span>Minimum 10 characters</span>
            <span>{message.length}/500</span>
          </div>
        </div>

        {/* Submission Section */}
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          isDisabled={!user || isLoading || message.length < 10 || rating === 0}
          className="bg-gradient-to-r from-[#5E121D] to-[#8A1A2B] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          startContent={!isLoading && <FiEdit3 className="w-5 h-5" />}
        >
          {isLoading ? "Submitting..." : "Publish Review"}
        </Button>

        {!user && (
          <p className="text-sm text-[#5E121D]/80">
            You must be logged in to submit a review.{" "}
            <span className="text-[#5E121D] font-medium">Sign in</span>
          </p>
        )}
      </div>
    </div>
  );
}
