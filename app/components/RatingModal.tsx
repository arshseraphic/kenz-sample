"use client";

import Image from 'next/image';
import React from 'react'
import { FaStar } from 'react-icons/fa6';


interface RatingModalProps {
  open: boolean;
  onClose: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose }) => {
  if (!open) return null; // hide modal completely

  return (
    <div className="modal modal-open">
      <div className="modal-box text-[#272622] max-w-[700px] rounded-none animate-fadeIn relative bg-white p-6">
        <button
          className="text-black absolute right-5 top-5 !text-[24px] cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="mb-4">
          <h1 className="text-[#272622] leading-[100%] text-[24px] font-[400]">
            Rate Product
          </h1>
        </div>
        <div className='mb-6 w-full flex justify-center gap-3'>
          <Image
            src={"/images/star-fill.svg"}
            width={44}
            height={44}
            alt='star'
          />
          <Image
            src={"/images/star-fill.svg"}
            width={44}
            height={44}
            alt='star'
          />
          <Image
            src={"/images/star-unfill.svg"}
            width={44}
            height={44}
            alt='star'
          />
          <Image
            src={"/images/star-unfill.svg"}
            width={44}
            height={44}
            alt='star'
          />
          <Image
            src={"/images/star-unfill.svg"}
            width={44}
            height={44}
            alt='star'
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="block text-[14px] font-[400] text-[#787878]  mb-1">
            Add Review
          </label>
          <textarea
            name="name"
            rows={6}
            placeholder="Type here..."
            className={`bg-white border border-[#EFEFEF] text-[16px] font-[400]  px-4 w-full rounded-[30px] py-4 `}
            required
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="py-4 sm:w-[50%] w-full !text-[16px] !font-[400] !rounded-[50px] leading-none bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)] text-white"
          >
            Submit Review
          </button>
        </div>

      </div>
      <div
        className="modal-backdrop"
        onClick={onClose}
      ></div>
    </div>
  )
}

export default RatingModal
