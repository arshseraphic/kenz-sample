import Image from 'next/image'
import React from 'react'

const DownloadApp = () => {
  return (
    <div className='3xl:px-64 2xl:px-48 xl:px-20 lg:px-10 md:px-8 px-4 my-6 sm:my-11'>
      <div className='flex lg:flex-row flex-col justify-between overflow-hidden items-start lg:items-center rounded-[12px] sm:rounded-[40px] sm:bg-none bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)] sm:bg-white'>
        {/* Image - Hidden on mobile, visible on sm+ */}
        <Image
          src={"/images/mobile-group-image.svg"}
          width={1272}
          height={462}
          alt='Background Pattern'
          className='hidden sm:block relative opacity-100 lg:w-[1272px] lg:h-[462px] w-auto h-auto object-scale-down'
        />
        {/* Content */}
        <div className='w-full sm:xl:max-w-[45%] sm:lg:max-w-[50%] sm:w-[45%] lg:mx-10 lg:my-8 flex flex-col lg:items-start xl:pl-20 lg:text-left sm:mx-8 sm:my-6.5 text-center items-center justify-between sm:absolute py-6 sm:py-0 px-4 sm:px-0'>
          <h1 className='text-[#FFFFFF] text-[20px] sm:text-[32px] md:text-[38px] lg:text-[38px] font-[400] leading-[115%] sm:leading-[100%]'>Download Kenzari Jewellers App</h1>
          <p className='text-[#FFFFFF] mt-3 sm:mt-3 text-[12px] sm:text-[14px] lg:text-[18px] font-[400] leading-5 sm:leading-[140%]'>Download the Kenzari Jewellers app today and make buying jewellery super easy</p>
          <div className='flex flex-row sm:flex-row gap-3 sm:gap-5 lg:gap-5 mt-6 sm:mt-8 w-full sm:w-auto justify-center'>
            <img
              src='/images/playstore.png'
              alt='play store'
              className='w-[140px] sm:w-[150px] lg:w-[180px] h-[40px] sm:h-[50px] object-contain cursor-pointer'
            />

            <img
              src='/images/appstore.png'
              alt='app store'
              className='w-[140px] sm:w-[150px] lg:w-[180px] h-[40px] sm:h-[50px] object-contain cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadApp
