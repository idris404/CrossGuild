import React from "react";
import { TopSellingGamingGear } from "@/shared/components/TopSellingGamingGear";

const RelatedProducts = () => {
  return (
    <TopSellingGamingGear
      title="Recently Viewed"
      highlightedText="Products"
      showLink={false}
      sectionId="recently-viewed"
    />
  );
};

export default RelatedProducts;
