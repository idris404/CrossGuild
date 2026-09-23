"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { fetchCategories } from "@/features/products/services/product.service";

interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
}

const formatCategorySlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return <div className="cg-container h-80 animate-pulse bg-muted/30" />;
  }

  return (
    <section id="categories" className="cg-container cg-section">
      <h1 className="mb-8 text-center text-lg font-bold uppercase text-accent">Categories</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            href={`/categories/${formatCategorySlug(category.name)}`}
            key={category.id}
          >
            <Card className="group flex min-h-[245px] cursor-pointer flex-col overflow-hidden border-2 border-primary p-3 transition-[border-color,box-shadow] hover:border-accent hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-3 pb-0">
                <div className="relative h-[155px] w-full">
                  {" "}
                  <Image
                    src={category.image || "/images/placeholder-product.svg"}
                    alt={category.name}
                    fill
                    className="object-contain p-2"
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
              <CardFooter className="mt-auto p-3">
                <h3 className="mx-auto text-xl font-semibold text-[#4c4764] transition-colors group-hover:text-accent">
                  {category.name}
                </h3>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
