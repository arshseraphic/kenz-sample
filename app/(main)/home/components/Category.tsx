import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Diamond Jewellery",
      options: 224,
      image: "/images/image1.svg", // replace with your real path
      icon: "/images/option1.svg",

    },
    {
      id: 2,
      name: "Gold Jewellery",
      options: 224,
      image: "/images/image2.svg",
      icon: "/images/option1.svg",
    },
    {
      id: 3,
      name: "Silver Jewellery",
      options: 224,
      image: "/images/image3.svg",
      icon: "/images/option1.svg",
    },
    {
      id: 4,
      name: "Daily Wear",
      options: 224,
      image: "/images/image4.svg",
      icon: "/images/option1.svg",
    },
  ];
  return (
    <div className="w-full bg-white 3xl:px-64 2xl:px-48 xl:px-20 lg:px-10 md:px-8 px-5 lg:my-8 my-5 mb-7 flex flex-col lg:gap-8 gap-4">
      <div className="flex items-center justify-center">
        <h1 className="text-[#272622] font-[400] text-[28px] sm:text-[38px] leading-[100%] mb-[20px]">
          Shop by Category
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((item: any) =>
          <Link key={item.id} href={"/category-products"}>
            <div
              className="relative rounded-2xl overflow-hidden group">
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                className="w-full h-[auto] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
              {item.options && (
                <div className="absolute rounded-l-full leading-[100%] text-[14px] sm:text-[16px] font-[400] top-8 text-[#272622] right-0 bg-[#FFFFFF] pr-6 pl-4 py-2 flex items-center gap-2 shadow  ">
                  <Image src={item.icon} alt="icon" width={20} height={20} />
                  {item.options} Options
                </div>
              )}
              <div className="font-[400] z-1 leading-[100%] text-[24px] lg:text-[34px] whitespace-nowrap text-white absolute bottom-9 left-1/2 -translate-x-1/2 drop-shadow-lg">
                {item.name}
              </div>
              <div className="absolute inset-0 image-gradient transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-90"></div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Category;
