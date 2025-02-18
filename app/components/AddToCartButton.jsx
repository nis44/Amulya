"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";

// Brand color variables
const MAROON = "#5E121D";
const PEACH = "#EBD1C4";

export default function AddToCartButton({ productId, type }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isAdded = data?.carts?.find((item) => item?.id === productId);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        router.push("/login");
        throw new Error("Please log in to continue");
      }
      
      const newList = isAdded
        ? data?.carts?.filter((item) => item?.id !== productId)
        : [...(data?.carts ?? []), { id: productId, quantity: 1 }];

      await updateCarts({ list: newList, uid: user.uid });
      
      toast.success(isAdded ? "Removed from cart" : "Added to cart", {
        style: {
          background: MAROON,
          color: PEACH,
          border: `1px solid ${PEACH}`
        }
      });
      
    } catch (error) {
      toast.error(error?.message, {
        style: {
          background: PEACH,
          color: MAROON,
          border: `1px solid ${MAROON}`
        }
      });
    }
    setIsLoading(false);
  };

  const baseStyles = `transition-colors duration-300 ${
    isAdded 
      ? `bg-[${MAROON}] text-[${PEACH}] hover:bg-[${PEACH}] hover:text-[${MAROON}]`
      : `bg-[${PEACH}] text-[${MAROON}] hover:bg-[${MAROON}] hover:text-[${PEACH}]`
  }`;

  if (type === "cute") {
    return (
      <Button
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={handleClick}
        className={`${baseStyles} border-2 border-[${MAROON}] rounded-full font-medium`}
      >
        {isAdded ? "Remove from Cart" : "Add to Cart"}
      </Button>
    );
  }

  if (type === "large") {
    return (
      <Button
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={handleClick}
        className={`${baseStyles} px-8 py-6 rounded-xl text-lg font-medium gap-2`}
        startContent={
          isAdded ? (
            <ShoppingBasket className="w-5 h-5" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )
        }
      >
        {isAdded ? "In Cart" : "Add to Cart"}
      </Button>
    );
  }

  return (
    <Button
      isLoading={isLoading}
      isDisabled={isLoading}
      onClick={handleClick}
      isIconOnly
      className={`${baseStyles} rounded-full p-3`}
    >
      {isAdded ? (
        <ShoppingBasket className="w-5 h-5" />
      ) : (
        <ShoppingCart className="w-5 h-5" />
      )}
    </Button>
  );
}
