"use client"

import Image from "next/image";
import React from "react";

interface InfluencerModalProps {
  open: boolean;
  onClose: () => void;
}

const InfluencerModal: React.FC<InfluencerModalProps> = ({ open, onClose }) => {
  if (!open) return null; // hide modal completely

  return (
    <div className="modal modal-open">
      <div className="modal-box text-[#272622] max-w-[700px] rounded-none animate-fadeIn relative bg-white p-0">
        <button
          className="text-black absolute right-5 top-5 !text-[24px] cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-6">
          <div className="mb-4">
            <h1 className="text-[#272622] leading-[100%] text-[24px] font-[400]">
              Join Affiliate Program
            </h1>
            <p className="text-[14px] mt-1">Please enter your details below</p>
          </div>
          <div className="flex items-center justify-start gap-6 w-full">
            <div className='min-w-[134px] h-[134px] flex justify-center pt-8 relative bg-[#F2F2F2] rounded-full overflow-hidden'>
              <Image src={"/images/user-placeholder.svg"}
                width={48}
                height={48}
                alt='user'
                className='h-[48px] w-[48px] rounded-full object-cover' />
              <div className="absolute bottom-0 left-0 w-full h-[29%] 
                  bg-[#00000065]
                  flex items-center justify-center">

                <Image
                  src="/images/camera-icon.svg"
                  alt="camera"
                  width={24}
                  height={24}
                />

              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-[14px] font-[400] text-[#787878]  mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                className={`bg-white border border-[#EFEFEF] text-[16px] font-[400]  px-4 w-full rounded-[40px] py-2 `}
                required
              />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-[#EAEAEA]">
          <h1 className="font-[400] text-[#272622] text-[18px] leading-[100%]">Add at least 1 url below</h1>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
          >
            <div className="flex flex-col w-full">
              <label className="block text-[14px] font-[400] text-[#787878]  mb-1">
                Instagram Profile Url
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Url"
                className={`bg-white border border-[#EFEFEF] text-[16px] font-[400]  px-4 w-full rounded-[40px] py-2 `}
                required
              />
            </div> <div className="flex flex-col w-full">
              <label className="block text-[14px] font-[400] text-[#787878]  mb-1">
                TikTok Profile Url
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Url"
                className={`bg-white border border-[#EFEFEF] text-[16px] font-[400]  px-4 w-full rounded-[40px] py-2 `}
                required
              />
            </div> <div className="flex flex-col w-full">
              <label className="block text-[14px] font-[400] text-[#787878]  mb-1">
                Twitter Profile Url
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Url"
                className={`bg-white border border-[#EFEFEF] text-[16px] font-[400]  px-4 w-full rounded-[40px] py-2 `}
                required
              />
            </div> <div className="flex flex-col w-full">
              <label className="block text-[14px] font-[400] text-[#787878]  mb-1">
                Youtube Channel Url
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Url"
                className={`bg-white border border-[#EFEFEF] text-[16px] font-[400]  px-4 w-full rounded-[40px] py-2 `}
                required
              />
            </div>
          </form>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="py-4 sm:w-[50%] w-full !text-[16px] !font-[400] !rounded-[50px] leading-[100%] bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)] text-white"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default InfluencerModal;
