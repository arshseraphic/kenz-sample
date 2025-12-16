// components/Navbar.tsx
"use client";

import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import RegisterModal from "./RegisterModal";
import SpinToWinModal from "./SpinToWinModal";
import { FaArrowLeftLong, FaBars, FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import categoryService from "../../services/categoryService";
import { useAuth } from "@/lib/context/AuthContext";
import { useCountry } from "@/lib/context/CountryContext";
import { FiLogIn } from "react-icons/fi";
import { capitalizeFirstLetter } from "../../lib/utils/helper";


const menuItems = [
  {
    id: 1,
    label: "All Jewellery",
    icon: "/images/gem-icon.svg",
    href: null,               // click toggles popup
    opensGold: true,
  },
  {
    id: 2,
    label: "Necklace",
    icon: "/images/set-icon.svg",
    href: null,
    opensGold: true,
  },
  {
    id: 3,
    label: "Bracelet",
    icon: "/images/bracelet-icon-image.svg",
    href: null,
    opensGold: true,
  },
  {
    id: 4,
    label: "Rings",
    icon: "/images/ring-icon.svg",
    href: null,
    opensGold: true,
  },
  {
    id: 5,
    label: "Earrings",
    icon: "/images/earring-icon.svg",
    href: null,
    opensGold: true,
  },
  {
    id: 6,
    label: "Bangles",
    icon: "/images/bangle-icon-image.svg",
    href: null,
    opensGold: true,
  },
  {
    id: 7,
    label: "Pendants",
    icon: "/images/pendant-icon-image.svg",
    href: "/custom-jewellery",   // direct navigation
    opensGold: false,
  },
  {
    id: 8,
    label: "More",
    icon: "/images/more-icon-image.svg",
    href: null,
    opensGold: true,
  },
  {
    id: 9,
    label: "Custom Jewellery",
    icon: "/images/customjewe-icon-image.svg",
    href: "/custom-jewellery",   // direct navigation
    opensGold: false,
  },
];


export default function Navbar({
  isProfileOpen,
  setIsProfileOpen,
  isGoldOpen,
  setIsGoldOpen,
}: {
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isGoldOpen: boolean;
  setIsGoldOpen: (open: boolean) => void;
}) {
  const [isRegister, setIsRegister]: any = useState(false);
  const [searchHistory, setSearchHistory]: any = useState([
    "Earrings",
    "Necklace",
    "Neckl",
    "Diamond cut ring",
    "Wedding jewellery",
    "Wedding jewellery",
  ]);
  const [isCountryOpen, setIsCountryOpen]: any = useState(false);
  const { selectedCountry, setSelectedCountry, countries } = useCountry();
  const [showDropdown, setShowDropdown]: any = useState(false);
  const [searchTerm, setSearchTerm]: any = useState("");
  const [isSubCategoryOpen, setIsSubCategoryOpen]: any = useState(false);
  const [categories, setCategories]: any = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory]: any = useState<any>(null);
  const { user, isAuthenticated, isLoading, error, logout } = useAuth();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const getCategories = async () => {
    const response: any = await categoryService.getAllCategories();
    setCategories(response);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const removeHistory = (item: string) => {
    setSearchHistory((prev: any) => prev.filter((i: any) => i !== item));
  };

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById(
      "mobile-drawer"
    ) as HTMLInputElement | null;
    setIsSubCategoryOpen(false);
    drawerCheckbox?.checked && (drawerCheckbox.checked = false);
  };

  const trendingItems = [
    { id: 1, name: "Earring Name to be Here", image: "/images/ringimg2.png" },
    { id: 2, name: "Earring Name to be Here", image: "/images/ringimg2.png" },
    { id: 3, name: "Earring Name to be Here", image: "/images/ringimg2.png" },
    { id: 4, name: "Earring Name to be Here", image: "/images/ringimg2.png" },
    { id: 5, name: "Earring Name to be Here", image: "/images/ringimg2.png" },
  ];

  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const handleIconClick = (tab: "wallet" | "wishlist" | "orders") => {
    if (isMobile) {
      router.push(`/profile/${tab}`);
    } else {
      router.push(`/profile?tab=${tab}`);
    }
  };

  const fetchProductsforcategory = async (categoryId: string) => {
    console.log("category id--", categoryId);
  };

  const handleCategoryClick = (category: any) => {
    if (category.children?.length) {
      setSelectedCategory(category);
      setIsGoldOpen(true);
      setIsProfileOpen(false);
    } else {
      setIsGoldOpen(false);
      router.push(`/category-products?categoryId=${category._id}`);
    }
  };

  const handleMobileCategoryClick = (category: any) => {
    if (category.children?.length) {
      setSelectedCategory(category);
      setIsSubCategoryOpen(true);
    } else {
      router.push(`/${category.slug}`);
      closeDrawer();
    }
  };

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleGoldEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsGoldOpen(true);
  };

  const handleGoldLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsGoldOpen(false);
    }, 150);
  };

  let hoverProfileTimeout: any;

  const handleMouseEnter = () => {
    clearTimeout(hoverProfileTimeout);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    hoverProfileTimeout = setTimeout(() => {
      setIsProfileOpen(false);
    }, 150); // delay so it doesn’t flicker
  };

  return (
    <>
      <nav className="w-full fixed h-fit left-0 right-0 top-0 z-40 bg-white shadow-[0px_8px_12px_0px_#0000000A]
">
        <div className="drawer">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

          {/* ---------- MAIN CONTENT ---------- */}
          <div className="drawer-content flex flex-col">
            {/* TOP BAR */}
            <div className="w-full">
              <div className="3xl:px-56 2xl:px-20 xl:px-15 lg:px-8 md:px-6 px-4 pt-4 pb-3 flex justify-between items-center">
                {/* LEFT – LOGO + HAMBURGER + COUNTRY */}
                <div className="flex items-center gap-3">
                  {/* Hamburger (mobile) */}
                  <div className="flex items-center gap-3 lg:hidden">
                    <label htmlFor="mobile-drawer" className="p-1">
                      <FaBars
                        size={22}
                        className="text-[#272622] cursor-pointer"
                      />
                    </label>
                  </div>

                  <Link href="/home">
                    <Image
                      src="/images/kenzari-logo.svg"
                      alt="Kenzari"
                      width={225}
                      height={37}
                      className="object-contain cursor-pointer w-[150px] sm:w-[225px] sm:h-[37px] h-auto"
                    />
                  </Link>

                  {/* Country selector (desktop) */}
                  {/* <button
                    onClick={() => setIsCountryOpen(true)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Image
                      width={20}
                      height={20}
                      src={selectedCountry.flag}
                      alt="flag"
                      className="h-[20px] w-[20px] rounded-full bg-center object-cover"
                    />
                    <span className="hidden sm:flex text-[14px]  font-[400] text-[#272622]">
                      {selectedCountry.name}
                    </span>
                    <MdKeyboardArrowDown size={24} className="text-[#272622]" />
                  </button> */}
                </div>

                {/* SEARCH BAR (desktop) */}
                <div className="lg:flex flex-1 hidden max-w-xl mx-4 relative">
                  <div className="relative w-full">
                    <input
                      type="text"
                      width={570}
                      height={46}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() =>
                        setTimeout(() => setShowDropdown(false), 150)
                      }
                      placeholder="Search products here..."
                      className="w-full text-[#272622] pl-10 pr-4  py-3 placeholder:text-[#787878] placeholder:text-[15px] pt-2 font-[400] rounded-full border border-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#013FE8] hover:ring-1 hover:ring-[#8725EA] hover:border-[#013FE8] color-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)]"
                    />
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                    {/* Search dropdown */}
                    {showDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-full rounded-b-[24px] border border-[#F2F2F2] bg-[#FFF] z-50">
                        <div className="p-3">
                          <p className="text-[#272622] text-[16px] style-medium font-[500] leading-[100%]">
                            Search History
                          </p>
                        </div>
                        <div className="max-h-100 overflow-y-auto">
                          <ul>
                            {searchHistory.length === 0 ? (
                              <li className="p-3 text-[#787878] text-[14px] not-italic font-[400] leading-normal">
                                No recent searches
                              </li>
                            ) : (
                              searchHistory.map((item: any, idx: any) => (
                                <Link key={idx} href="/carat-gold">
                                  <li className="flex justify-between items-center px-4 py-2.5 text-[#787878] text-[16px] not-italic font-[400] leading-normal cursor-pointer hover:bg-[#f8f1eb]">
                                    <span>{item}</span>
                                    <IoCloseOutline
                                      className="w-[18px] h-[18px] text-[#C8C8C8]"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeHistory(item);
                                      }}
                                    />
                                  </li>
                                </Link>
                              ))
                            )}
                          </ul>

                          {/* Trending */}
                          <div className="mt-2">
                            <div className="p-3">
                              <p className="text-[#272622]  text-[16px]  font-[500] leading-[100%]">
                                Trending
                              </p>
                            </div>
                            <div className="p-3 flex gap-3 w-full overflow-x-auto">
                              {trendingItems.map((item, idx) => (
                                <Link key={idx} href="/carat-gold">
                                  <div className="shrink-0 p-2 w-[120px] sm:w-[140px] md:w-[160px] flex flex-col items-center">
                                    <Image
                                      className="w-full h-[112px] object-cover bg-center"
                                      src={item.image}
                                      alt={item.name}
                                      width={160}
                                      height={112}
                                    />
                                    <p className="text-[#272622]  text-[14px] font-[500] style-medium sm:text-[14px]  leading-[100%] mt-2 ">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT – BALANCE, WISHLIST, CART, PROFILE */}
                <div className="flex items-center gap-5">
                  {/* Balance */}
                  {/* <button
                    onClick={() => handleIconClick("wallet")}
                    className="hidden sm:flex items-center gap-2 bg-[#F8F1EB] p-1 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_1px_1px_#f7dcc4]"
                  >
                    <div className="h-[28px] w-[29px] bg-[#272622] rounded-full flex justify-center items-center transition-all duration-300">
                      <Image
                        src="/images/wallet-icon.svg"
                        alt="wallet"
                        width={16}
                        height={16}
                        className="transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[#272622]  text-[14px] font-[500]">
                      Balance: <strong className="font-[700]">$200</strong>
                    </span>
                    <MdKeyboardArrowRight className="text-[#272622] text-[20px]" />
                  </button> */}

                  {/* Wishlist */}
                  <Link href="/notification">
                    <Image
                      src="/images/notification-bell.svg"
                      alt="Notification"
                      width={24}
                      height={24}
                      className="cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                  </Link>
                  <Image
                    src="/images/heart-icon.svg"
                    alt="wishlist"
                    width={24}
                    height={24}
                    className="cursor-pointer transition-transform duration-300 hover:scale-110"
                    onClick={() => handleIconClick("wishlist")}
                  />

                  {/* Cart */}
                  <Link href="/shopping-bag">
                    <Image
                      src="/images/shopping-cart-icon2.svg"
                      alt="cart"
                      width={24}
                      height={24}
                      className="cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                  </Link>

                  {/* Profile dropdown */}
                  <div
                    className="relative profile-dropdown lg:block hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Avatar */}
                    <div className="avatar cursor-pointer">
                      <Image
                        src="/images/user.svg"
                        alt="profile"
                        width={24}
                        height={24}
                        className="cursor-pointer transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    {/* Dropdown */}
                    <div
                      className={`flex flex-col rounded-[12px] overflow-hidden absolute right-0 top-full z-10 ${true ? "w-60" : "w-48"
                        } mt-2 p-0 bg-white border-t border-l border-[#EDF0F4] shadow-lg transform transition-all duration-300 ease-out origin-top-right ${isProfileOpen
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                        }`}
                    >
                      {true ? (
                        <div className="flex flex-col">
                          {/* Profile Info */}
                          <div className="flex flex-col gap-[2px] px-5 py-3 bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)]">
                            <div className="flex items-center gap-3 ">
                              <Image
                                src="/images/user-white.svg"
                                alt="User Avatar"
                                width={24}
                                height={24}
                                className="h-[24px] w-[24px]"
                              />
                              <div>
                                <span className="text-white leading-none font-[500] text-[16px]">
                                  {user?.name || "User"}
                                </span>
                                <Link
                                  onClick={() => setIsProfileOpen(false)}
                                  href="/profile"
                                  className="group"
                                >
                                  <button className="text-white cursor-pointer  !text-[12px] leading-none !font-[300] flex items-center gap-1 transition-all duration-300 ">
                                    View Profile
                                    <GoArrowRight
                                      className="text-white transition-transform duration-300 group-hover:translate-x-1 "
                                      size={14}
                                    />
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Orders */}
                          <div
                            onClick={() => {
                              setIsProfileOpen(false);
                              handleIconClick("orders");
                            }}
                            className="border-b border-[#EAEAEA] cursor-pointer hover:bg-[#f8f1eb] py-3.5 px-5"
                          >
                            <button className="flex flex-row gap-2 items-center">
                              <Image
                                src="/images/order-history.svg"
                                width={24}
                                height={24}
                                alt="Orders"
                              />
                              <span className="text-[#272622] font-[400] text-[14px]">
                                Orders History
                              </span>
                            </button>
                          </div>

                          {/* Wallet */}
                          <Link href={"/influencer"}>
                            <div
                              onClick={() => {
                                setIsProfileOpen(false);
                              }}
                              className="border-b border-[#EAEAEA] cursor-pointer hover:bg-[#f8f1eb] py-3.5 px-5"
                            >
                              <button className="flex flex-row gap-2 items-center">
                                <Image
                                  src="/images/switch-influencer.svg"
                                  width={24}
                                  height={24}
                                  alt="Wallet"
                                />
                                <span className="text-[#272622] font-[400] text-[14px]">
                                  Switch to Influencer
                                </span>
                              </button>
                            </div>
                          </Link>

                          {/* Logout */}
                          <div
                            onClick={logout}
                            className="cursor-pointer hover:bg-[#f8f1eb] py-3.5 px-5"
                          >
                            <button className="flex flex-row gap-2 items-center">
                              <Image
                                src="/images/logout.svg"
                                width={24}
                                height={24}
                                alt="Logout"
                              />
                              <span className="text-[#272622] font-[400] text-[14px]">
                                Logout
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => setIsRegister(!isRegister)}
                          className="cursor-pointer hover:bg-[#f8f1eb] py-3 px-5"
                        >
                          <button className="flex flex-row gap-2 items-center">
                            <Image
                              src="/images/login-icon.svg"
                              width={24}
                              height={24}
                              alt="Wallet"
                            />
                            <span className="text-[#272622] font-[400] text-[14px]">
                              Log in / Sign up
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* MOBILE SEARCH (below top bar) */}
              <div className="lg:hidden flex-1 flex pb-4 max-w-full mx-4 relative">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    placeholder="Search products here..."
                    className="w-full text-[#272622] pl-10 pr-4  py-3 placeholder:text-[#787878] placeholder:text-[15px] pt-2 font-[400] rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  />
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full border border-[#F0F0F0] bg-[#FFF] z-50">
                      {/* same history + trending as desktop */}
                      {/* (omitted for brevity – identical to desktop version) */}
                    </div>
                  )}
                </div>
              </div>

              {/* DESKTOP MENU (categories) */}
              <div className="lg:flex hidden items-center justify-between 3xl:px-56 2xl:px-20 xl:px-15 lg:px-8 md:px-6 pt-3">
                <ul className="w-full flex flex-col flex-wrap md:flex-row md:items-center gap-2 justify-between text-sm font-medium">
                  {menuItems.map((item) => (
                    item.href ? (
                      // If href exists → wrap in Link
                      <div className="dropdown dropdown-end">
                        <div className="cursor-pointer" tabIndex={2}>
                          {/* <Link key={item.id} href={item.href}> */}
                          <li className="cursor-pointer flex items-center gap-2 pb-5 navbar-item">
                            <Image src={item.icon} alt={item.label} width={20} height={20} />
                            <span className="text-[#272622] xl:text-[16px]  text-[15px] font-[400]">
                              {item.label}
                            </span>
                          </li>
                          {/* </Link> */}
                          <ul
                            tabIndex={2}
                            className="dropdown-content menu bg-white z-20 w-fit border-t border-l border-[#EDF0F4] shadow-lg p-0"
                          >
                            <li className="flex cursor-pointer text-[#272622] flex-row items-center">
                              <Link href={item.href} className="font-[500] cursor-pointer text-[14px] flex items-center justify-between w-full py-4 border-b border-[#EAEAEA] px-4 whitespace-nowrap rounded-none"><span>Choose From Catalog</span> <GoArrowRight size={24} /></Link>

                            </li>
                            <li className="flex cursor-pointer text-[#272622] flex-row items-center">
                              <Link href={item.href} className="font-[500] cursor-pointer text-[14px] flex items-center justify-between w-full py-4 border-b border-[#EAEAEA] px-4 rounded-none"><span>Custom With Image</span> <GoArrowRight size={24} /></Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      // Click-based (popup open)
                      <li
                        key={item.id}

                        onClick={(e) => {
                          e.stopPropagation();
                          // if (!isDigitalGold) handleCategoryClick(category);
                        }}
                        onMouseEnter={() => {
                          setIsGoldOpen(true);
                          setIsProfileOpen(false);
                        }}
                        onMouseLeave={() => {
                          setIsGoldOpen(false);
                        }}
                        className="select-none cursor-pointer flex items-center gap-2 pb-5 navbar-item"
                      >
                        <Image src={item.icon} alt={item.label} width={20} height={20} />
                        <span className="text-[#272622] xl:text-[16px] text-[15px] font-[400]">
                          {item.label}
                        </span>
                      </li>
                    )
                  ))}
                </ul>

              </div>
            </div>
          </div>

          {/* ---------- MOBILE DRAWER ---------- */}
          <div className="drawer-side z-50">
            <label
              htmlFor="mobile-drawer"
              className="drawer-overlay"
              onClick={() => setIsSubCategoryOpen(false)}
            ></label>
            <div className="menu p-0 w-72 min-h-full bg-white text-base-content flex flex-col gap-4">
              {/* Header – user info or back button */}
              {!isSubCategoryOpen ? (
                <div className="flex items-center gap-3 border-b border-[#E7E7E7] p-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="p-3 border-[3px] border-[#FFFFFF] shadow-lg rounded-full bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)] ">
                        <Image
                          src="/images/user-white.svg"
                          alt="User Avatar"
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px]"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[#272622] leading-none font-[300] text-[22px]">
                        {user?.name}
                      </span>
                      <Link onClick={closeDrawer} href="/profile">
                        <button className="text-[#272622] cursor-pointer  !text-[16px] leading-none !font-[400] flex items-center gap-1">
                          View Profile
                          <GoArrowRight className="text-[#272622]" size={14} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <Image
                    onClick={() => setIsSubCategoryOpen(false)}
                    src="/images/arrow-right-02-sharp.svg"
                    alt="Back"
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px] object-cover cursor-pointer"
                  />
                </div>
              )}

              {/* Main menu or sub-category list */}
              {!isSubCategoryOpen ? (
                <>
                  {/* Balance button (mobile) */}
                  {/* <button
                    onClick={() => {
                      handleIconClick("wallet");
                      closeDrawer();
                    }}
                    className="flex w-fit mx-4 items-center gap-2 bg-[#F8F1EB] p-1 rounded-full text-sm"
                  >
                    <div className="h-[28px] w-[29px] bg-[#272622] rounded-full flex justify-center items-center">
                      <Image
                        src="/images/wallet-icon.svg"
                        alt="wallet"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span className="text-[#272622]  text-[14px] font-[500]">
                      Balance: <strong className="font-[700]">$200</strong>
                    </span>
                    <MdKeyboardArrowRight className="text-[#272622] text-[20px]" />
                  </button> */}

                  {/* Category list */}
                  <ul className="flex text-[#272622] flex-col p-4 pt-0 gap-3 sm:gap-5 text-[16px] font-[500]">
                    {menuItems?.map((item: any) => (
                      <li
                        key={item.id}
                        onClick={() => handleMobileCategoryClick(item)}
                        className="select-none flex-row cursor-pointer flex items-center"
                      >
                        <div className="pr-0">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={20}
                            height={20}
                            unoptimized
                            className="!w-[20px] !h-[20px] object-cover"
                          />
                        </div>
                        <span className="text-[#272622] xl:text-[16px] text-[16px] font-[400] ">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="flex text-[#272622] flex-col p-4 pt-0 gap-5 text-[16px] font-[500]">
                  {selectedCategory?.children.map((item: any) => (
                    <Link
                      key={item._id}
                      href={`/category-products?categoryId=${item._id}`}
                      onClick={() => {
                        setIsGoldOpen(false);
                        closeDrawer();
                        fetchProductsforcategory(item._id);
                      }}
                    >
                      <div className="flex flex-row gap-4 w-fit items-center">
                        <Image
                          src={`${baseUrl}${item.image}`}
                          alt={item.name}
                          width={20}
                          height={20}
                          className="rounded-full !w-[44px] !h-[44px] object-cover bg-center"
                        />
                        <span className="text-[#272622]  text-[16px] font-[500]">
                          {item.name}
                        </span>
                        <MdKeyboardArrowRight className="text-[#272622] cursor-pointer text-[30px]" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Logout (always visible when not in sub-category) */}
              {!isSubCategoryOpen && (
                <button
                  onClick={logout}
                  className="flex px-6 flex-row gap-2 items-center"
                >
                  <Image
                    src="/images/logout.svg"
                    width={20}
                    height={20}
                    alt="Logout"
                  />
                  <span className="text-[#272622] font-[400] text-[20px]">
                    Logout
                  </span>
                </button>
              )}
            </div>
          </div>
        </div >

        {/* ---------- GOLD DROPDOWN (desktop) ---------- */}
        <div
          onMouseEnter={handleGoldEnter}
          onMouseLeave={handleGoldLeave}
          className={`gold-dropdown absolute border-t top-[130px] 3xl:px-56 2xl:px-20 xl:px-15 lg:px-8 md:px-6 px-4 py-8 border-[#E2E2E2] bg-white z-50
              grid grid-cols-4 gap-10 justify-between w-full shadow-lg
              transform transition-all duration-300 ease-out origin-top
              ${isGoldOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
            }
            `}
          onClick={(e) => e.stopPropagation()}
        >
          {
            [
              { img: "/images/golds-image1.png", label: "Rings" },
              { img: "/images/golds-image2.png", label: "Necklace" },
              { img: "/images/golds-image3.png", label: "Bracelet" },
              { img: "/images/golds-image4.png", label: "Anklets" },
              { img: "/images/image2.png", label: "Bangles" },
              { img: "/images/golds-image6.png", label: "Earrings" },
              { img: "/images/golds-image7.png", label: "Pendants" },
              { img: "/images/golds-image8.png", label: "Nose pin" },
            ].map((item: any) => (
              <Link
                // href={`/category-products?categoryId=${item._id}`}
                href={"/category-products"}
                onClick={() => setIsGoldOpen(false)}
              >
                <div className="group flex flex-row gap-4 w-fit items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#F8F1EB]">
                  <Image
                    src={`${item.img}`}
                    alt={item.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover bg-center transition-all duration-300 group-hover:ring-2 group-hover:ring-[#FFCA6D]"
                  />
                  <span className="text-[#272622]  text-[16px] font-[500] transition-colors duration-300">
                    {item.label}
                  </span>
                  <MdKeyboardArrowRight className="text-[#272622] text-[30px] transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))
          }
        </div >
      </nav >

      {/* ---------- COUNTRY MODAL ---------- */}
      {/* ---------- COUNTRY MODAL ---------- */}
      {
        isCountryOpen && (
          <div className="modal modal-open">
            <div className="modal-box max-w-[450px] rounded-none animate-fadeIn relative bg-white p-5">
              <button
                className="text-black absolute right-4 top-5 !text-[18px] cursor-pointer"
                onClick={() => setIsCountryOpen(false)}
              >
                ✕
              </button>
              <div className="mb-4">
                <h1 className="text-[#272622] leading-none text-[34px] font-[400]">
                  Select Your Country
                </h1>
              </div>
              <div className="text-[#272622] flex flex-col justify-center text-center overflow-y-scroll w-full max-h-[19rem]">
                <ul className="flex flex-col gap-3 w-full text-left">
                  {countries.map((c, i) => (
                    <li
                      key={i}
                      className="flex gap-2 justify-between items-center pb-1 cursor-pointer hover:opacity-80"
                      onClick={() => {
                        setSelectedCountry(c);
                        setIsCountryOpen(false);
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <Image
                          width={31}
                          height={31}
                          src={c.flag}
                          alt={`${c.name} flag`}
                          className="h-[31px] w-[31px] rounded-full bg-center object-cover"
                        />
                        <span className="text-[16px] font-[400] ">
                          {c.name}
                        </span>
                      </div>
                      {selectedCountry.name === c.name && (
                        <FaCheck size={20} className="text-[#FFCA6D]" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Backdrop */}
            <div
              className="modal-backdrop"
              onClick={() => setIsCountryOpen(false)}
            ></div>
          </div>
        )
      }

      <RegisterModal isOpen={isRegister} setOpen={setIsRegister} />
    </>
  );
}
