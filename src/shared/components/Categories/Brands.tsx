"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  fetchBrands,
  type BrandListItem,
} from "@/features/products/services/product.service";

const Brands = () => {
  const [brands, setBrands] = useState<BrandListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBrands();
  }, []);

  if (isLoading) {
    return <div className="cg-container h-40 animate-pulse bg-muted/30" />;
  }

  return (
    <section className="cg-container cg-section pt-4">
      <h1 className="mb-8 text-center text-lg font-bold uppercase text-accent">Popular Brands</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => {
          // Générer un slug basé sur le nom si aucun slug n'existe
          const brandSlug =
            brand.slug || brand.name.toLowerCase().replace(/ /g, "-");

          return (
            <Link
              key={brand.id}
              href={`/brands/${brandSlug}`}
              className="block"
            >
              <Card className="flex h-[145px] cursor-pointer items-center overflow-hidden border-2 border-primary p-3 transition-[border-color,box-shadow] hover:border-accent hover:shadow-lg">
                <CardContent className="flex w-full flex-col items-center p-2">
                  <div className="relative h-[95px] w-full">
                    {" "}
                    <Image
                      src={brand.logo || "/images/placeholder-product.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== "/images/placeholder-product.svg") {
                          target.src = "/images/placeholder-product.svg";
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Brands;
