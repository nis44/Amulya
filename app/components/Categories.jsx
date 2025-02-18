"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

export default function Categories({ categories }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    appendDots: dots => (
      <div className="absolute bottom-4">
        <ul className="flex gap-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 rounded-full border-2 border-[#EBD1C4] hover:bg-[#EBD1C4] transition-colors" />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (categories.length === 0) return null;

  return (
    <div className="bg-[#F9F6F4] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#5E121D] text-center mb-12">
          Explore Categories
        </h2>

        <Slider {...settings} className="pb-8">
          {categories.map((category) => (
            <div key={category.id} className="px-2 group">
              <Link 
                href={`/categories/${category.id}`}
                className="block hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex flex-col items-center gap-4 p-4">
                  <div className="relative w-32 h-32 rounded-full border-2 border-[#EBD1C4] group-hover:border-[#5E121D] transition-colors overflow-hidden">
                    <img
                      src={category.imageURL}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-[#5E121D] group-hover:text-[#8A1A2B] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
