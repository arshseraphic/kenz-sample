import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#F2F2F2] text-[#272622] w-full 3xl:px-56 2xl:px-20 xl:px-15 lg:px-8 md:px-6 px-4">
      <div className="py-10 border-b border-[#DFD9D4]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* About Us */}
          <div className="flex flex-col items-start">
            <Image
              src="/images/kenzari-logo.svg"
              alt="Kenzari"
              width={225}
              height={37}
              className="object-contain cursor-pointer"
            />
            <p className="mt-5 text-[14px] text-[#272622] font-[400] leading-5">
              Kenzari Jewellers is your trusted destination for exquisite
              jewellery, offering a wide range of designs crafted with precision
              and care.
            </p>

          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-[22px] leading-[100%] font-[400] mb-5">
              Useful Links
            </h3>
            <ul className="space-y-3 text-[14px]  font-[400]">
              <li>
                <a className="hover:text-yellow-700">Cart</a>
              </li>
              <li>
                <Link href={"/digital-gold"} className="hover:text-yellow-700">
                  Wishlist
                </Link>
              </li>
              <li>
                <a className="hover:text-yellow-700">Track Orders</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[22px] leading-[100%] font-[400] mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3 text-[14px]  font-[400]">
              <li className="flex gap-3">
                <div className="pt-1">
                  <Image
                    src="/images/phone-icon.svg"
                    alt="Phone"
                    width={18}
                    height={18}
                    className="h-full"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a href="tel:+919090903555" className="hover:text-[#013FE8]">
                    +91-9090903555
                  </a>
                  <span className="text-[#DFD9D4]">|</span>
                  <a href="tel:+919090902555" className="hover:text-[#013FE8]">
                    +91-9090902555
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div>
                  <Image
                    src="/images/mail-icon.svg"
                    alt="Envelope"
                    width={18}
                    height={18}
                    className=""
                  />
                </div>
                <a
                  href="mailto:support@goldcash.co"
                  className="hover:text-[#013FE8]"
                >
                  supportmail@gmail.com
                </a>
              </li>
              <li className="flex">
                <div className="pt-1 min-w-[30px] flex items-center">
                  <Image
                    src="/images/location-icon-image.svg"
                    alt="Location"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
                </div>
                <div>
                  Unit no 834, 8th Floor, Tower B2, Spaze i-Tech Park, Sohna
                  Road, Sector 49, Gurgaon, Haryana, 122018
                </div>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex lg:justify-center">
            <div>
              <h3 className="text-[22px] leading-[100%] font-[400] mb-5">
                Follow Us On
              </h3>
              <div className="flex justify-around space-x-4 text-2xl">
                <a className="cursor-pointer">
                  <Image
                    src="/images/facebook-image.svg"
                    alt="Facebook"
                    width={12.25}
                    height={24}
                    className="h-full"
                  />
                </a>
                <a className="cursor-pointer">
                  <Image
                    src="/images/instagram-image.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="h-full"
                  />
                </a>
                <a className="cursor-pointer">
                  <Image
                    src="/images/twitter-image.svg"
                    alt="Twitter"
                    width={24}
                    height={20}
                    className="h-full"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Logos / Awards */}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pb-10 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 gap-4">
        <p className=" text-[16px]  font-[400]">© All rights reserved</p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4  text-[16px]  font-[400]">
          <a className="hover:text-yellow-700">Terms & Conditions</a>
          <span>|</span>
          <a className="hover:text-yellow-700">Privacy Policy</a>
          <span>|</span>
          <a className="hover:text-yellow-700">Cookies Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
