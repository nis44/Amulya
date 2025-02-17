import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import MyRating from "@/app/components/MyRating";
import AuthContextProvider from "@/contexts/AuthContext";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import Link from "next/link";
import { Suspense } from "react";
// import Image from "next/image";

export default function Details({ product }) {
  return (
    <div className="w-full flex flex-col gap-6 px-4 lg:px-8">
      {/* Category & Brand */}
      <div className="flex gap-3">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>

      {/* Title */}
      <h1 className="font-serif font-bold text-3xl md:text-4xl text-[#5E121D] tracking-tight">
        {product?.title}
      </h1>

      {/* Rating */}
      <Suspense fallback={<div className="h-6 bg-[#EBD1C4] animate-pulse w-32"/>}>
        <RatingReview product={product} />
      </Suspense>

      {/* Short Description */}
      <p className="text-lg text-[#5E121D]/80 leading-relaxed border-b border-[#EBD1C4] pb-6">
        {product?.shortDescription}
      </p>

      {/* Pricing */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-bold text-[#5E121D]">
            ₹{product?.salePrice}
          </span>
          {product?.price > product?.salePrice && (
            <span className="text-lg text-[#8A1A2B] line-through">
              ₹{product?.price}
            </span>
          )}
        </div>
        {product?.stock <= (product?.orders ?? 0) ? (
          <span className="px-3 py-1.5 text-sm bg-red-50 text-red-700 border border-red-100 rounded-full w-fit">
            Out of Stock
          </span>
        ) : (
          <span className="px-3 py-1.5 text-sm bg-green-50 text-green-700 border border-green-100 rounded-full w-fit">
            In Stock
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <AuthContextProvider>
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href={`/checkout?type=buynow&productId=${product?.id}`}
            className="flex-1 min-w-[200px]"
          >
            <button className="w-full bg-[#5E121D] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium">
              Purchase Now
            </button>
          </Link>
          <div className="flex gap-2">
            <AddToCartButton 
              type={"cute"} 
              productId={product?.id}
              className="bg-[#EBD1C4] text-[#5E121D] hover:bg-[#5E121D] hover:text-white"
            />
            <FavoriteButton 
              productId={product?.id} 
              className="bg-[#EBD1C4] text-[#5E121D] hover:bg-[#5E121D] hover:text-white"
            />
          </div>
        </div>
      </AuthContextProvider>

      {/* Description */}
      <div className="mt-6">
        <h3 className="font-serif text-xl text-[#5E121D] mb-4">Craftsmanship Details</h3>
        <div 
          className="prose text-[#5E121D]/80 max-w-none"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        />
      </div>
    </div>
  );
}

async function Category({ categoryId }) {
  const category = await getCategory({ id: categoryId });
  return (
    <Link 
      href={`/categories/${categoryId}`}
      className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#EBD1C4] hover:border-[#5E121D] transition-colors"
    >
      {category?.imageURL && (
        <img
          src={category.imageURL}
          alt={category.name}
          width={24}
          height={24}
          className="object-contain"
        />
      )}
      <span className="text-sm font-medium text-[#5E121D] group-hover:text-[#8A1A2B] transition-colors">
        {category?.name}
      </span>
    </Link>
  );
}

async function Brand({ brandId }) {
  const brand = await getBrand({ id: brandId });
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#EBD1C4]">
      {brand?.imageURL && (
        <img
          src={brand.imageURL}
          alt={brand.name}
          width={24}
          height={24}
          className="object-contain"
        />
      )}
      <span className="text-sm font-medium text-[#5E121D]">{brand?.name}</span>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex items-center gap-3">
      <MyRating 
        value={counts?.averageRating ?? 0} 
        className="text-[#FCCC4C]" // Gold color for stars
      />
      <span className="text-sm text-[#5E121D]/80">
        {counts?.totalReviews} verified reviews
      </span>
    </div>
  );
}
