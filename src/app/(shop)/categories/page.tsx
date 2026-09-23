import React from "react";
import Catehero from "@/shared/components/Categories/CateHero";
import CategoriesSection from "@/shared/components/Categories/categoriesSection";
import { TopSellingGamingGear } from "@/shared/components/TopSellingGamingGear";
import Brands from "@/shared/components/Categories/Brands";

const page = () => {
  return (
    <div className="flex flex-col">
      <Catehero />
      <CategoriesSection />
      <Brands />
      <p className="mt-2 text-center text-lg font-bold uppercase text-accent">Recommended Products</p>
      <TopSellingGamingGear />
    </div>
  );
};

export default page;
