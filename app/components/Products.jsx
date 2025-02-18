"use client";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Suspense } from "react";
import MyRating from "./MyRating";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

export default function ProductsGridView({ products }) {
  return (
    <section className="bg-[#F9F6F4] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#5E121D] text-center mb-12">
          Curated Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((item) => (
            <ProductCard product={item} key={item?.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#EBD1C4] hover:shadow-lg transition-all group">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl">
      <Link href={`/products/${product?.id}`}>
        <img
          src={product?.featureImageURL}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
          alt={product?.title}
        />
        </Link>
        
        {/* Favorite Button */}
        <div className="absolute top-4 right-4">
          <AuthContextProvider>
            <FavoriteButton 
              productId={product?.id}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full border border-[#EBD1C4] hover:bg-[#5E121D] hover:text-white"
            />
          </AuthContextProvider>
        </div>

        {/* Stock Status */}
        {product?.stock <= (product?.orders ?? 0) && (
          <div className="absolute bottom-4 left-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-4">
        <Link href={`/products/${product?.id}`} className="group">
          <h3 className="font-serif text-lg font-bold text-[#5E121D] group-hover:text-[#8A1A2B] transition-colors">
            {product?.title}
          </h3>
          <p className="text-sm text-[#5E121D]/80 line-clamp-2 mt-2">
            {product?.shortDescription}
          </p>
        </Link>

        {/* Price & Rating */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-bold text-[#5E121D]">
              ₹{product?.salePrice}
            </span>
            {product?.price > product?.salePrice && (
              <span className="text-sm text-[#5E121D]/60 line-through">
                ₹{product?.price}
              </span>
            )}
          </div>
          
          <Suspense fallback={<div className="h-4 bg-[#EBD1C4] animate-pulse w-24 rounded" />}>
            <RatingReview product={product} />
          </Suspense>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link 
            href={`/checkout?type=buynow&productId=${product?.id}`}
            className="flex-1"
          >
            <button className="w-full bg-[#5E121D] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#8A1A2B] transition-colors flex items-center justify-center gap-2">
              <FiShoppingBag className="w-4 h-4" />
              Buy Now
            </button>
          </Link>
          
          <AuthContextProvider>
            <AddToCartButton 
              productId={product?.id}
              className="bg-[#EBD1C4] text-[#5E121D] hover:bg-[#5E121D] hover:text-white px-4 py-3 rounded-lg text-sm"
            />
          </AuthContextProvider>
        </div>
      </div>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex items-center gap-3">
      <MyRating 
        value={counts?.averageRating ?? 0} 
        className="text-[#D4AF37] text-lg" 
      />
      <span className="text-sm text-[#5E121D]/80">
        ({counts?.totalReviews} reviews)
      </span>
    </div>
  );
}
