"use client";

import { Star } from "lucide-react";
import type { ProductDetailItem } from "@/features/products/types/product.type";

interface ProductInfoProps {
  product: ProductDetailItem;
  averageRating: number;
}

export default function ProductInfo({
  product,
  averageRating,
}: ProductInfoProps) {
  return (
    <div className="relative z-10">
      <nav className="mb-8 inline-block text-sm text-muted-foreground">
        <span className="hover:text-accent transition-colors cursor-pointer">
          Home
        </span>
        <span className="mx-2">›</span>
        <span className="hover:text-accent transition-colors cursor-pointer">
          {product.category?.name || "Category"}
        </span>
        <span className="mx-2">›</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <h1 className="mb-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
        {product.name}
      </h1>

      <div className="mb-4 mt-2 flex items-center">
        {product.reviews && product.reviews.length > 0 && (
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 transition-all duration-200 ${
                  index < Math.round(averageRating)
                    ? "fill-primary text-primary"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-3 text-sm font-bold text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.reviews.length}{" "}
              {product.reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      {product.brand && <p className="mb-4 text-base text-muted-foreground">Type : {product.brand.name}</p>}

      <div className="mb-5">
        <p className="leading-relaxed text-muted-foreground">{product.description}</p>
      </div>

      <p className="mb-5 text-3xl font-bold text-foreground">{product.price.toFixed(2).replace(".", ",")}€</p>

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${product.quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-sm font-medium text-muted-foreground">Stock:</span>
          </div>
          <span
            className={`text-sm font-semibold ${
              product.quantity > 0
                ? "text-green-700 dark:text-green-400"
                : "text-red-700 dark:text-red-400"
            }`}
          >
            {product.quantity > 0
              ? `${product.quantity} available`
              : "Out of stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
