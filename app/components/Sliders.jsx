"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";

function CustomArrow(props) {
  const { onClick, direction } = props;
  return (
    <button
      onClick={onClick}
      className={`absolute ${direction}-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border-2 border-[#EBD1C4] hover:bg-[#EBD1C4] group transition-all`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-6 h-6 text-[#EBD1C4] group-hover:text-[#5E121D]" />
      ) : (
        <ChevronRight className="w-6 h-6 text-[#EBD1C4] group-hover:text-[#5E121D]" />
      )}
    </button>
  );
}

export default function FeaturedProductSlider({ featuredProducts }) {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    // fade: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    appendDots: dots => (
      <div className="absolute bottom-8">
        <ul className="flex gap-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 rounded-full border-2 border-[#EBD1C4] hover:bg-[#EBD1C4] transition-colors" />
    )
  };

  return (
    <>
    <div className="relative overflow-hidden bg-[#5E121D] py-16">
    <div className="absolute inset-0 border-[3px] border-[#EBD1C4] m-3 pointer-events-none" />
    <div className="absolute inset-0 border-[3px] border-[#EBD1C4] m-6 pointer-events-none" />
      <Slider {...settings}>
        {featuredProducts?.map((product) => (
          <div key={product.id} className="relative group">
            <div className="flex flex-col md:flex-row gap-8 px-4 md:px-24 items-center min-h-[600px]">
              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-center gap-6 z-10 md:max-w-[50%] text-[#EBD1C4]">
                <span className="font-serif text-lg tracking-widest text-[#EBD1C4]/80">
                  NEW ARRIVAL
                </span>
                
                <Link href={`/products/${product?.id}`} className="space-y-6">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                    {product?.title}
                    <div className="w-24 h-1 bg-[#EBD1C4] mt-4" />
                  </h1>
                  <p className="text-lg font-light max-w-xl">
                    {product?.shortDescription}
                  </p>
                </Link>

                <AuthContextProvider>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link 
                      href={`/checkout?type=buynow&productId=${product?.id}`}
                      className="flex-1 min-w-[200px]"
                    >
                      <Button 
                        className="w-full bg-[#EBD1C4] text-[#5E121D] py-6 text-lg font-medium hover:bg-[#5E121D] hover:text-[#EBD1C4] transition-all border-2 rounded-xl border-[#EBD1C4]"
                      >
                        Acquire Now
                      </Button>
                    </Link>
                    
                    <div className="flex gap-4">
                      <AddToCartButton 
                        productId={product?.id} 
                        className="bg-transparent text-[#EBD1C4] hover:bg-[#EBD1C4] hover:text-[#5E121D] h-44 text-xl border-2 border-[#EBD1C4] rounded-none"
                      />
                      
                      <FavoriteButton 
                        productId={product?.id} 
                        className="bg-transparent text-[#EBD1C4] hover:bg-[#EBD1C4] hover:text-[#5E121D] h-14 w-14 text-lg border-2 border-[#EBD1C4] rounded-none"
                      />
                    </div>
                  </div>
                </AuthContextProvider>
              </div>

              {/* Image Section */}
              <div className="flex-1 relative flex items-center justify-center">
                <div className="relative z-10 group">
                  <div className="absolute inset-0 border-2 border-[#EBD1C4] translate-x-6 translate-y-6" />
                  <img
                    className="h-[400px] md:h-[500px] object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                    src={product?.featureImageURL}
                    alt={product?.title}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </>
  );
}
