"use client";

import { useEffect, useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import {
  createNewProduct,
  updateProduct,
} from "@/lib/firestore/products/write";
import { useRouter, useSearchParams } from "next/navigation";
import { getProduct } from "@/lib/firestore/products/read_server";
import { Save, Plus } from "lucide-react";

export default function Page() {
  const [data, setData] = useState(null);
  const [featureImage, setFeatureImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getProduct({ id: id });
      if (!res) {
        throw new Error("Product Not Found");
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
    setData((prevData) => {
      return {
        ...(prevData ?? {}),
        [key]: value,
      };
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewProduct({
        data: data,
        featureImage: featureImage,
        imageList: imageList,
      });
      setData(null);
      setFeatureImage(null);
      setImageList([]);
      toast.success("Product is successfully Created!");
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateProduct({
        data: data,
        featureImage: featureImage,
        imageList: imageList,
      });
      setData(null);
      setFeatureImage(null);
      setImageList([]);
      toast.success("Product is successfully Updated!");
      router.push(`/admin/products`);
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (id) {
          handleUpdate();
        } else {
          handleCreate();
        }
      }}
      className="flex flex-col gap-6 p-6 bg-[#F9F6F4] min-h-screen"
    >
      <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border border-[#EBD1C4]">
        <h1 className="text-2xl font-serif font-bold text-[#5E121D]">
          {id ? "Update Product" : "Create New Product"}
        </h1>
        <Button 
          isLoading={isLoading} 
          isDisabled={isLoading} 
          type="submit"
          className="bg-[#5E121D] text-white px-6 py-3 hover:bg-[#8A1A2B] transition-colors"
          startContent={!isLoading && (id ? <Save size={18} /> : <Plus size={18} />)}
        >
          {id ? "Save Changes" : "Create Product"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#EBD1C4]">
            <BasicDetails data={data} handleData={handleData} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#EBD1C4]">
            <Images
              data={data}
              featureImage={featureImage}
              setFeatureImage={setFeatureImage}
              imageList={imageList}
              setImageList={setImageList}
            />
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#EBD1C4]">
            <Description data={data} handleData={handleData} />
          </div>
        </div>
      </div>
    </form>
  );
}
