"use client";

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const InfluencerNavbar = () => {
  const pathname = usePathname();
  return (
    <div className='3xl:px-56 2xl:px-20 xl:px-15 lg:px-8 md:px-6 px-4 pt-6 flex justify-between items-center shadow-[0px_8px_12px_0px_#0000000A] bg-white sticky top-0 z-10'>
      <div className='flex flex-row items-center md:justify-start justify-between w-full'>
        <div className='flex flex-row items-center md:w-[20rem] lg:w-xl w-fit pb-6'>
          <Link href={"/"}><Image width={24} height={24} alt={"logout"} src="/images/logout-icon.svg" /></Link>
          <Image width={38} height={38} alt={"logo"} className='pl-3' src="/images/k-icon.svg" />
          <p className='text-[#272622] text-[14px] font-[400] leading-[100%] md:block hidden pl-2'>Back to Kenzari Jewellery</p>
        </div>
        <div className='flex flex-row lg:gap-8 gap-5 items-center'>
          <Link
            href="/influencer/influencer-profile"
            className={`relative flex flex-row gap-3 items-center pb-6 
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[5px] after:w-full
          ${pathname === "/influencer/influencer-profile"
                ? "after:bg-[linear-gradient(166.41deg,#013FE8_0%,#8725EA_100%)]"
                : "after:bg-transparent"
              }`}
          >
            <Image
              src="/images/my-profile-icon.svg"
              width={24}
              height={24}
              alt="profile"
            />
            <span className="text-[#272622] text-[16px] font-[400] leading-[100%]">
              My Profile
            </span>
          </Link>

          {/* Financials */}
          <Link
            href="/influencer/financial"
            className={`relative flex flex-row gap-3 items-center pb-6 
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[5px] after:w-full
          ${pathname === "/influencer/financial"
                ? "after:bg-[linear-gradient(166.41deg,#013FE8_0%,#8725EA_100%)]"
                : "after:bg-transparent"
              }`}
          >
            <Image
              src="/images/financial-icon.svg"
              width={24}
              height={24}
              alt="financial"
            />
            <span className="text-[#272622] text-[16px] font-[400] leading-[100%]">
              Financials
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InfluencerNavbar
