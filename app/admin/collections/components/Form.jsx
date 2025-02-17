"use client";

import { getCollection } from "@/lib/firestore/collections/read_server";
import {
  createNewCollection,
  updateCollection,
} from "@/lib/firestore/collections/write";
import { useProduct, useProducts } from "@/lib/firestore/products/read";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: products } = useProducts({ pageLimit: 2000 });

  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getCollection({ id: id });
      if (!res) {
        toast.error("Collection Not Found!");
      } else {
        setData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = (key, value) => {
    setData((preData) => {
      return {
        ...(preData ?? {}),
        [key]: value,
      };
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewCollection({ data: data, image: image });
      toast.success("Successfully Created");
      setData(null);
      setImage(null);
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateCollection({ data: data, image: image });
      toast.success("Successfully Updated");
      setData(null);
      setImage(null);
      router.push(`/admin/collections`);
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-4 w-full md:max-w-2xl">
      <h1 className="text-2xl font-serif font-bold text-[#5E121D] border-b border-[#EBD1C4] pb-3">
        {id ? "Edit Collection" : "Create Collection"}
      </h1>

      <form onSubmit={(e) => {
          e.preventDefault();
          id ? handleUpdate() : handleCreate();
        }} 
        className="flex flex-col gap-4"
      >
        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
            Collection Image <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-[#EBD1C4] rounded-xl hover:border-[#5E121D] transition-colors">
            <label 
              htmlFor="collection-image"
              className="cursor-pointer block p-4"
            >
              {image || data?.imageURL ? (
                <div className="relative">
                  <img
                    className="h-32 w-full object-contain rounded-lg"
                    src={image ? URL.createObjectURL(image) : data?.imageURL}
                    alt="Collection preview"
                  />
                  <div className="absolute inset-0 bg-[#5E121D]/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <span className="text-white font-medium">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-[#5E121D]/50">
                  <span className="text-4xl">+</span>
                  <p className="mt-2 text-sm">Upload Image</p>
                  <p className="text-xs">Recommended ratio: 1:1</p>
                </div>
              )}
            </label>
            <input
              type="file"
              id="collection-image"
              className="hidden"
              onChange={(e) => e.target.files[0] && setImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
            Collection Title <span className="text-red-500">*</span>
          </label>
          <input
            id="collection-title"
            type="text"
            placeholder="Summer Collection"
            value={data?.title ?? ""}
            onChange={(e) => handleData("title", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
          />
        </div>

        {/* Subtitle Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
            Subtitle <span className="text-red-500">*</span>
          </label>
          <input
            id="collection-sub-title"
            type="text"
            placeholder="Featured jewelry pieces for summer"
            value={data?.subTitle ?? ""}
            onChange={(e) => handleData("subTitle", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
          />
        </div>

        {/* Selected Products */}
        <div className="flex flex-wrap gap-2">
          {data?.products?.map((productId) => (
            <ProductCard 
              key={productId} 
              productId={productId} 
              setData={setData} 
            />
          ))}
        </div>

        {/* Product Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
            Add Products <span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) => {
              if (!e.target.value) return;
              setData(prev => ({
                ...prev,
                products: [...(prev?.products || []), e.target.value]
              }));
            }}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] text-[#5E121D]"
          >
            <option value="">Select a product</option>
            {products?.map((item) => (
              <option 
                key={item.id}
                value={item.id}
                disabled={data?.products?.includes(item.id)}
                className="text-[#5E121D]"
              >
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit"
          isLoading={isLoading}
          className={`bg-[#5E121D] text-white px-6 py-3 rounded-lg hover:bg-[#8A1A2B] transition-colors ${isLoading ? 'opacity-80' : ''}`}
        >
          {id ? "Save Changes" : "Create Collection"}
        </Button>
      </form>
    </div>
  );
}

function ProductCard({ productId, setData }) {
  const { data: product } = useProduct({ productId });

  return (
    <div className="flex items-center gap-2 bg-[#EBD1C4] text-[#5E121D] px-3 py-1 rounded-full">
      <span className="text-sm font-medium">{product?.title}</span>
      <button
        onClick={() => setData(prev => ({
          ...prev,
          products: prev.products.filter(id => id !== productId)
        }))}
        className="hover:text-[#8A1A2B] transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}