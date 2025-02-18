"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import TrustBadges from "@/components/TrustBadges";

function CustomArrow(props) {
  const { onClick, direction } = props;
  return (
    <button
      onClick={onClick}
      className={`absolute ${direction}-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full border-2 border-[#EBD1C4] hover:bg-[#EBD1C4] transition-colors`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-6 h-6 text-[#5E121D]" />
      ) : (
        <ChevronRight className="w-6 h-6 text-[#5E121D]" />
      )}
    </button>
  );
}

export default function Collections({ collections }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    appendDots: dots => (
      <div className="absolute bottom-6">
        <ul className="flex gap-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 rounded-full border-2 border-[#EBD1C4] hover:bg-[#EBD1C4] transition-colors" />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (collections.length === 0) return null;

  return (
    <div className="bg-[#F9F6F4] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#5E121D] text-center mb-12">
          Curated Collections
        </h2>
        
        <Slider {...settings} className="pb-12">
          {collections?.map((collection) => (
            <div key={collection.id} className="px-2 group">
              <div className="bg-white rounded-xl shadow-lg border border-[#EBD1C4] p-6 hover:shadow-xl transition-all h-full">
                <div className="flex flex-col md:flex-row gap-6 h-full">
                  {/* Image Section */}
                  <div className="flex-1 relative overflow-hidden rounded-lg">
                    <img
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={collection.imageURL}
                      alt={collection.title}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl font-bold text-[#5E121D]">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-[#5E121D]/80 line-clamp-3">
                        {collection.subTitle}
                      </p>
                    </div>
                    
                    <Link 
                      href={`/collections/${collection.id}`}
                      className="mt-6 inline-block"
                    >
                      <Button
                        className="w-full bg-[#5E121D] text-white py-3 rounded-lg hover:bg-[#8A1A2B] transition-colors font-medium"
                      >
                        Explore Collection
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* <TrustBadges className="border-t border-[#EBD1C4] pt-12" /> */}
      </div>
    </div>
  );
}
