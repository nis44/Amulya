"use client";

import { getAdmin } from "@/lib/firestore/admins/read_server";
import { createNewAdmin, updateAdmin } from "@/lib/firestore/admins/write";
import { Button } from "@nextui-org/react";
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
      const res = await getAdmin({ id: id });
      if (!res) {
        toast.error("Admin Not Found!");
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
      await createNewAdmin({ data: data, image: image });
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
      await updateAdmin({ data: data, image: image });
      toast.success("Successfully Updated");
      setData(null);
      setImage(null);
      router.push(`/admin/admins`);
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-6 w-full md:max-w-md">
      <h1 className="text-2xl font-serif font-bold text-[#5E121D] border-b border-[#EBD1C4] pb-3">
        {id ? "Update Admin Profile" : "Create New Admin"}
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
            Profile Image <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-[#EBD1C4] rounded-xl hover:border-[#5E121D] transition-colors">
            <label 
              htmlFor="admin-image"
              className="cursor-pointer block p-4"
            >
              {image || data?.imageURL ? (
                <div className="relative">
                  <img
                    className="h-32 w-full object-cover rounded-lg"
                    src={image ? URL.createObjectURL(image) : data?.imageURL}
                    alt="Admin preview"
                  />
                  <div className="absolute inset-0 bg-[#5E121D]/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <span className="text-white font-medium">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-[#5E121D]/50">
                  <span className="text-4xl">+</span>
                  <p className="mt-2 text-sm">Upload Image</p>
                  <p className="text-xs">Recommended: Square aspect ratio</p>
                </div>
              )}
            </label>
            <input
              type="file"
              id="admin-image"
              className="hidden"
              onChange={(e) => e.target.files[0] && setImage(e.target.files[0])}
              accept="image/*"
            />
          </div>
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-name"
            type="text"
            placeholder="John Doe"
            value={data?.name ?? ""}
            onChange={(e) => handleData("name", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#5E121D]/80 uppercase tracking-wide">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-email"
            type="email"
            placeholder="john@example.com"
            value={data?.email ?? ""}
            onChange={(e) => handleData("email", e.target.value)}
            className="border border-[#EBD1C4] px-4 py-2.5 rounded-lg focus:border-[#5E121D] focus:ring-1 focus:ring-[#5E121D] placeholder-[#5E121D]/50"
            required
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit"
          isLoading={isLoading}
          className={`bg-black text-white px-6 py-3 rounded-lg hover:bg-[#8A1A2B] transition-colors ${
            isLoading ? 'opacity-80' : ''
          }`}
        >
          {id ? "Save Changes" : "Create Admin"}
        </Button>
      </form>
    </div>
  );
}
