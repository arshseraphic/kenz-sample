"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { capitalizeFirstLetter } from "@/lib/utils/helper";

const products = [
  {
    id: 1,
    name: "Earrings Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/earing-img.png",
  },
  {
    id: 2,
    name: "Necklace Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/necklace-img.png",
  },
  {
    id: 3,
    name: "Necklace Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/necklace1-img.png",
  },
  {
    id: 4,
    name: "Bracelet Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/bracelet-img.png",
  },
  {
    id: 5,
    name: "Earrings Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/earing-img.png",
  },
  {
    id: 6,
    name: "Bracelet Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/bracelet-img.png",
  },
  {
    id: 7,
    name: "Necklace Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/necklace1-img.png",
  },
  {
    id: 8,
    name: "Earrings Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/earing-img.png",
  },
  {
    id: 9,
    name: "Bracelet Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/bracelet-img.png",
  },
  {
    id: 10,
    name: "Necklace Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/necklace1-img.png",
  },
  {
    id: 11,
    name: "Earrings Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/earing-img.png",
  },
  {
    id: 12,
    name: "Necklace Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/necklace-img.png",
  },
  {
    id: 13,
    name: "Necklace Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/necklace1-img.png",
  },
  {
    id: 14,
    name: "Bracelet Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/bracelet-img.png",
  },
  {
    id: 15,
    name: "Earrings Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/earing-img.png",
  },
  {
    id: 16,
    name: "Bracelet Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/bracelet-img.png",
  },
  {
    id: 17,
    name: "Necklace Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/necklace1-img.png",
  },
  {
    id: 18,
    name: "Earrings Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/earing-img.png",
  },
  {
    id: 19,
    name: "Bracelet Name Here",
    category: "10-Carat Gold Jewellery",
    price: "$200",
    image: "/images/bracelet-img.png",
  },
  {
    id: 20,
    name: "Necklace Name Here",
    category: "Gems Jewellery",
    price: "$200",
    image: "/images/necklace1-img.png",
  },
];


const BestSeller: React.FC = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);


  return (
    <div className="w-full bg-white 3xl:px-64 2xl:px-48 3xl:px-64  xl:px-20 lg:px-10 md:px-8 px-5 lg:my-8 my-5 flex flex-col gap-6 relative">
      {/* Title + Navigation */}
      <div className=" items-center text-center justify-between">
        <h1 className="text-[#272622] text-center font-[400] text-[28px] sm:text-[38px] leading-[100%] mb-[20px]">
          Shop Our Bestsellers
        </h1>

        {/* Hide arrows on mobile */}
        <div className="hidden md:flex gap-2">
          <div className="absolute top-0 left-[22px] flex h-full items-center z-20">
            <button
              ref={prevRef}
              className="cursor-pointer w-[44px] h-[44px] flex items-center rounded-full justify-center transition-[0.6s] hover:bg-[darkblue] bg-[#013FE8] p-2.5"
            >
              <FaChevronLeft className="text-white h-full w-full" />
            </button>
          </div>
          <div className="absolute top-0 right-[22px] flex h-full items-center z-20">
            <button
              ref={nextRef}
              className="cursor-pointer w-[44px] h-[44px] flex items-center rounded-full justify-center transition-[0.6s] hover:bg-[darkblue] bg-[#013FE8] p-2.5"
            >
              <FaChevronRight className="text-white h-full w-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {/* {isLoading ? (
        <div className="text-center text-[#272622]">Loading...</div>
      ) : ( */}
      <Swiper
        modules={[Navigation, Keyboard]}
        spaceBetween={24}
        slidesPerView={4}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.2, // 👈 shows 2 half images
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;

            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        className="w-full"
      >
        {products?.length > 0 ? (
          products?.map((item: any) => (
            <SwiperSlide key={item._id}>
              <Link href={`/category-products`}>
                <div className="flex flex-col gap-2">
                  {/* Product Image */}
                  <div className="relative rounded-[12px] w-full h-[370px] bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover bg-center  transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                    <button
                      className="absolute top-4 right-4 w-[42px] h-[42px] flex justify-center items-center bg-white rounded-full p-1
                    transition-all duration-300 ease-in-out
                    shadow-[0_2px_6px_rgba(0,0,0,0.15)]
                    hover:shadow-[0_6px_14px_rgba(0,0,0,0.25)]
                    hover:-translate-y-1 hover:scale-105"
                    >
                      <Image
                        src="/images/heart-icon.svg"
                        alt="wishlist"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-[20px] leading-[100%] text-[#272622] font-[400]">
                        {item.name}
                      </h2>
                      <p className="text-[20px] leading-[100%] text-[#272622] font-[600]">
                        {item.price}
                      </p>
                    </div>
                    <p className="text-[14px] font-lato leading-[100%]  text-[#787878] font-[400]">
                      {item.category}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center text-[#272622]">
            No best-selling products found.
          </div>
        )}
      </Swiper>
      {/* )} */}
    </div>
  );
};

export default BestSeller;
