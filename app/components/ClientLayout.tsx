"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen]: any = useState(false);
  const [isGoldOpen, setIsGoldOpen]: any = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".profile-dropdown") &&
        !target.closest(".gold-dropdown")
      ) {
        setIsProfileOpen(false);
        setIsGoldOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-hidden">
      <div>
        <Navbar
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          isGoldOpen={isGoldOpen}
          setIsGoldOpen={setIsGoldOpen}
        />
        <div className="flex flex-col xl:dynamic-padding sm:pt-[131px] pt-[126px]">{children}</div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
