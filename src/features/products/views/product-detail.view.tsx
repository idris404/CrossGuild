"use client";

import ProductGallery from "@/features/products/components/product-gallery.component";
import ProductInfo from "@/features/products/components/product-info.component";
import ProductActions from "@/features/products/components/product-actions.component";
import ProductReviewsSection from "@/features/reviews/components/product-reviews-section.component";
import RelatedProducts from "@/shared/components/RelatedProducts";
import { useProductDetail } from "@/features/products/hooks/use-product-detail.hook";
import type { ProductDetailItem } from "@/features/products/types/product.type";

interface ProductDetailViewProps {
  product: ProductDetailItem;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const {
    quantity,
    setQuantity,
    selectedOptions,
    handleOptionSelect,
    handleQuantityChange,
    handleAddToCart,
    handleBuyNow,
    handleAddToWishlist,
    isAddingToCart,
    isAddingToWishlist,
    isInWishlist,
    isPending,
    averageRating,
  } = useProductDetail(product);

  return (
    <div className="cg-container mt-20 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 py-4 md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center">
          <ProductGallery
            product={product}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onQuantityDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
            onQuantityIncrease={() =>
              setQuantity((prev) => Math.min(product.quantity, prev + 1))
            }
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
          />
        </div>

        <div className="relative w-full max-w-[560px] md:w-1/2">
          <ProductInfo product={product} averageRating={averageRating} />
          <ProductActions
            product={product}
            averageRating={averageRating}
            isAddingToCart={isAddingToCart}
            isAddingToWishlist={isAddingToWishlist}
            isInWishlist={isInWishlist}
            isPending={isPending}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleAddToWishlist}
          />
        </div>
      </div>

      <ProductReviewsSection productId={product.id} productName={product.name} />
      <RelatedProducts />
    </div>
  );
}
