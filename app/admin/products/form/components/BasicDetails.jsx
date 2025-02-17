"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";

export default function BasicDetails({ data, handleData }) {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  return (
    <section className="flex-1 flex flex-col gap-4 bg-white rounded-xl p-5 shadow-sm border border-[#EBD1C4]">
      <h1 className="text-xl font-serif font-bold text-[#5E121D] border-b border-[#EBD1C4] pb-2 mb-2">
        Basic Details
      </h1>

      <div className="space-y-4">
        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide" htmlFor="product-title">
            Product Name <span className="text-red-500 text-xs">*</span>
          </label>
          <input
            type="text"
            placeholder="Gold Plated Diamond Necklace"
            id="product-title"
            value={data?.title ?? ""}
            onChange={(e) => handleData("title", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
            required
          />
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide" htmlFor="product-short-decription">
            Short Description <span className="text-red-500 text-xs">*</span>
          </label>
          <input
            type="text"
            placeholder="Elegant diamond necklace with 18k gold plating"
            id="product-short-decription"
            value={data?.shortDescription ?? ""}
            onChange={(e) => handleData("shortDescription", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
            required
          />
        </div>

        {/* Brand Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide" htmlFor="product-brand">
            Brand <span className="text-red-500 text-xs">*</span>
          </label>
          <select
            id="product-brand"
            value={data?.brandId ?? ""}
            onChange={(e) => handleData("brandId", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] text-[#5E121D] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM1RTEyMUQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25rem] appearance-none"
            required
          >
            <option value="" className="text-[#5E121D]/50">Select Brand</option>
            {brands?.map((item) => (
              <option value={item?.id} key={item?.id} className="text-[#5E121D] hover:bg-[#EBD1C4]/30">
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide" htmlFor="product-category">
            Category <span className="text-red-500 text-xs">*</span>
          </label>
          <select
            id="product-category"
            value={data?.categoryId ?? ""}
            onChange={(e) => handleData("categoryId", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] text-[#5E121D] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDIiNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNUUxMjFEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtY2hldnJvbi1kb3duIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25rem] appearance-none"
            required
          >
            <option value="" className="text-[#5E121D]/50">Select Category</option>
            {categories?.map((item) => (
              <option value={item?.id} key={item?.id} className="text-[#5E121D] hover:bg-[#EBD1C4]/30">
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide" htmlFor="product-stock">
              Stock <span className="text-red-500 text-xs">*</span>
            </label>
            <input
              type="number"
              id="product-stock"
              value={data?.stock ?? ""}
              onChange={(e) => handleData("stock", e.target.valueAsNumber)}
              className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide" htmlFor="product-price">
              Price (₹) <span className="text-red-500 text-xs">*</span>
            </label>
            <input
              type="number"
              id="product-price"
              value={data?.price ?? ""}
              onChange={(e) => handleData("price", e.target.valueAsNumber)}
              className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide" htmlFor="product-sale-price">
              Sale Price (₹) <span className="text-red-500 text-xs">*</span>
            </label>
            <input
              type="number"
              id="product-sale-price"
              value={data?.salePrice ?? ""}
              onChange={(e) => handleData("salePrice", e.target.valueAsNumber)}
              className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
              required
            />
          </div>
        </div>

        {/* Featured Product */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
            Featured Product <span className="text-red-500 text-xs">*</span>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleData("isFeatured", true)}
              className={`flex-1 py-2 rounded-lg border transition-colors ${
                data?.isFeatured 
                  ? "border-[#5E121D] bg-[#5E121D] text-white" 
                  : "border-[#EBD1C4] text-[#5E121D] hover:bg-[#EBD1C4]/30"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleData("isFeatured", false)}
              className={`flex-1 py-2 rounded-lg border transition-colors ${
                !data?.isFeatured 
                  ? "border-[#5E121D] bg-[#5E121D] text-white" 
                  : "border-[#EBD1C4] text-[#5E121D] hover:bg-[#EBD1C4]/30"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
