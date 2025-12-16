"use client";

import Hero from "./components/Hero";
import BestSeller from "./components/BestSeller";
import Category from "./components/Category";

const HomePage = () => {

  return (
    <div className="w-full flex flex-col gap-2 relative">
      <Hero />
      <BestSeller />
      <Category />
    </div>
  );
};

export default HomePage;
