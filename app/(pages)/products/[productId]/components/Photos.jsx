"use client";

import { useState } from "react";
// import Image from "next/image";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [showZoom, setShowZoom] = useState(false);

  if (imageList?.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full group">
      {/* Main Image Container */}
      <div className="relative  w-full bg-[#F9F6F4] rounded-xl overflow-hidden shadow-lg">
        <img
          fill
          src={selectedImage}
          alt="Product showcase"
          className="object-contain transition-transform duration-300 hover:scale-105"
          quality={100}
          priority
        />
        
        {/* Zoom Trigger */}
        <button 
          onClick={() => setShowZoom(true)}
          className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <MagnifyingGlassPlusIcon className="w-6 h-6 text-[#5E121D]" />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3 overflow-x-auto pb-3 px-1">
        {imageList?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === img 
                ? "border-[#5E121D] shadow-md" 
                : "border-[#EBD1C4] hover:border-[#5E121D]/50"
            }`}
          >
            <img
              fill
              src={img}
              alt={`Product view ${index + 1}`}
              className="object-cover"
              quality={50}
            />
          </button>
        ))}
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setShowZoom(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl aspect-square">
            <img
              fill
              src={selectedImage}
              alt="Zoomed product view"
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  );
}
