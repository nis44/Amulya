"use client";

import { getCategory } from "@/lib/firestore/categories/read_server";
import {
  createNewCategory,
  updateCategory,
} from "@/lib/firestore/categories/write";
import { Button } from "@nextui-org/react";
import { Plus, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id });
      if (!res) {
        toast.error("Category Not Found!");
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
      await createNewCategory({ data: data, image: image });
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
      await updateCategory({ data: data, image: image });
      toast.success("Successfully Updated");
      setData(null);
      setImage(null);
      router.push(`/admin/categories`);
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
<div className="flex flex-col gap-5 bg-white rounded-xl p-6 w-full md:w-[480px] border border-[#EBD1C4] shadow-sm">
  <h1 className="text-xl font-serif font-bold text-[#5E121D] border-b border-[#EBD1C4] pb-3">
    {id ? "Update Category" : "Create New Category"}
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
        Category Image <span className="text-red-500">*</span>
      </label>
      <div className="border-2 border-dashed border-[#EBD1C4] rounded-xl hover:border-[#5E121D] transition-colors">
        <label 
          htmlFor="category-image"
          className="cursor-pointer block p-4"
        >
          {image ? (
            <div className="relative">
              <img
                className="h-32 w-full object-contain rounded-lg"
                src={URL.createObjectURL(image)}
                alt="Category preview"
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
          id="category-image"
          className="hidden"
          onChange={(e) => e.target.files[0] && setImage(e.target.files[0])}
        />
      </div>
    </div>

    {/* Name Input */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
        Category Name <span className="text-red-500">*</span>
      </label>
      <input
        id="category-name"
        type="text"
        placeholder="e.g., Diamond Rings"
        value={data?.name ?? ""}
        onChange={(e) => handleData("name", e.target.value)}
        className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
      />
    </div>

    {/* Slug Input */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
        URL Slug <span className="text-red-500">*</span>
      </label>
      <input
        id="category-slug"
        type="text"
        placeholder="e.g., diamond-rings"
        value={data?.slug ?? ""}
        onChange={(e) => handleData("slug", e.target.value)}
        className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
      />
      <p className="text-xs text-[#8A1A2B] mt-1">
        {data?.slug?.length || 0}/50 characters
      </p>
    </div>

    {/* Submit Button */}
    <Button 
      type="submit"
      isLoading={isLoading}
      className={`bg-[#5E121D] text-white px-6 py-3 rounded-lg hover:bg-[#8A1A2B] transition-colors
        ${isLoading ? 'opacity-80' : ''}`}
      startContent={!isLoading && (id ? <Save size={18} /> : <Plus size={18} />)}
    >
      {id ? "Save Changes" : "Create Category"}
    </Button>

    {/* {successMessage && (
      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm">
        {successMessage}
      </div>
    )} */}
  </form>
</div>

  );
}
