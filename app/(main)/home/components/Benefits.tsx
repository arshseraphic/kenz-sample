import Image from "next/image";
import React from "react";

const Benefits = () => {
  const features = [
    {
      imgSrc: '/images/ring-icon.svg',
      alt: 'Ring',
      title: 'Wide Range of Jewellery',
      description: 'Lorem ISpum Is a dummy text in websites as a placeholder',
    },
    {
      imgSrc: '/images/shopping-cart-icon.svg',
      alt: 'Cart',
      title: 'Pre-Sales Available',
      description: 'Lorem ISpum Is a dummy text in websites as a placeholder',
    },
    {
      imgSrc: '/images/verified-icon.svg',
      alt: 'Cart',
      title: 'Verified Retailers',
      description: 'Lorem ISpum Is a dummy text in websites as a placeholder',
    },
    {
      imgSrc: '/images/truck-return-icon.svg',
      alt: 'Digital Gold',
      title: 'Easy Returns',
      description: 'Lorem ISpum Is a dummy text in websites as a placeholder',
    },
  ];
  return (
    <div className='w-full bg-[#F2F2F2] lg:my-15 my-5 flex flex-col gap-8'>
      <div className='grid lg:grid-cols-4 grid-cols-2 justify-center lg:gap-14 gap-6 items-stretch 2xl:px-52 xl:px-30 lg:px-10 px-5 lg:my-18 my-8'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-transparent flex flex-col justify-between items-center text-center h-full gap-4'
          >
            <div className='flex flex-col justify-between items-center text-center'>
              <Image
                src={feature.imgSrc}
                alt={feature.alt}
                width={index === 0 ? 64 : 64}
                height={index === 0 ? 64 : 64}
                className='mb-8'
              />
              <h1 className='text-[#272622] font-[400] text-[20px] sm:text-[24px] leading-[115%] sm:leading-[100%]'>
                {feature.title}
              </h1>
            </div>
            <p className='text-[#787878] text-[12px] sm:text-[14px]  font-[400] leading-[141%]'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
