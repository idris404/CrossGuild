"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import type { ProductDetailItem } from "@/features/products/types/product.type";

interface ProductGalleryProps {
  product: Pick<ProductDetailItem, "name" | "images" | "quantity" | "options">;
  quantity: number;
  onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQuantityDecrease: () => void;
  onQuantityIncrease: () => void;
  selectedOptions: Record<string, string>;
  onOptionSelect: (optionId: string, value: string) => void;
}

export default function ProductGallery({
  product,
  quantity,
  onQuantityChange,
  onQuantityDecrease,
  onQuantityIncrease,
  selectedOptions,
  onOptionSelect,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="relative w-full max-w-[500px]">

      <div
        ref={imageRef}
        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-md border-2 border-accent bg-background transition-colors hover:border-[#4f38d8]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setScale(1.15)}
        onMouseLeave={() => setScale(1)}
      >
        {product.images[selectedImageIndex] && (
          <div className="relative w-full h-full">
            <Image
              src={product.images[selectedImageIndex].url}
              alt={product.name}
              fill
                  className="object-contain p-6 transition-transform duration-200"
              style={{
                transform: scale > 1 ? `scale(${scale})` : "none",
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            />
          </div>
        )}
      </div>

      <div className="relative mt-4">
        {startIndex > 0 && (
          <button
            onClick={() => setStartIndex((prev) => prev - 1)}
            className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-primary bg-background p-2 shadow-sm hover:bg-purple-50"
          >
            <ChevronLeft className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          </button>
        )}
        <div className="grid grid-cols-4 gap-3 px-7">
          {product.images.slice(startIndex, startIndex + 4).map((image, index) => {
            const imageIndex = startIndex + index;
            return (
              <div
                key={imageIndex}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-colors ${
                  selectedImageIndex === imageIndex
                    ? "border-accent"
                    : "border-primary hover:border-accent"
                }`}
                onClick={() => setSelectedImageIndex(imageIndex)}
              >
                <Image
                  src={image.url}
                  alt={`${product.name} ${imageIndex + 1}`}
                  fill
                  className="object-contain p-2"
                />
                {selectedImageIndex === imageIndex && (
                  <div className="pointer-events-none absolute inset-0 bg-primary/5" />
                )}
              </div>
            );
          })}
        </div>
        {startIndex + 4 < product.images.length && (
          <button
            onClick={() => setStartIndex((prev) => prev + 1)}
            className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-primary bg-background p-2 shadow-sm hover:bg-purple-50"
          >
            <ChevronRight className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium text-foreground">Quantity:</h3>
          <div className="flex gap-2 items-center">
            <button
              onClick={onQuantityDecrease}
              className="flex h-8 w-8 items-center justify-center rounded-l-md bg-muted transition-colors hover:bg-primary/30"
            >
              <span className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                −
              </span>
            </button>
            <Input
              type="number"
              value={quantity}
              onChange={onQuantityChange}
              min={1}
              max={product.quantity}
              className="h-8 w-12 rounded-none border-0 bg-muted text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              onClick={onQuantityIncrease}
              className="flex h-8 w-8 items-center justify-center rounded-r-md bg-muted transition-colors hover:bg-primary/30"
            >
              <span className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                +
              </span>
            </button>
          </div>
        </div>

        {product.options.map((option) => (
          <div
            key={option.id}
            className="flex flex-wrap items-center gap-3"
          >
            <h3 className="text-sm font-medium text-foreground">{option.name}:</h3>
            <div className="flex flex-wrap gap-3">
              {option.values.map((value) => (
                <button
                  key={value}
                  onClick={() => onOptionSelect(option.id, value)}
                  className={`relative rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                    selectedOptions[option.id] === value
                      ? "border-accent bg-accent text-white"
                      : "border-primary bg-background text-foreground hover:border-accent"
                  }`}
                >
                  {selectedOptions[option.id] === value && (
                    <div className="absolute inset-0 rounded-full bg-primary/10" />
                  )}
                  <span className="relative">{value}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
