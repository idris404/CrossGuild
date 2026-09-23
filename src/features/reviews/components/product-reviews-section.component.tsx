"use client";

import ReviewForm from "@/features/reviews/components/review-form.component";
import ReviewList from "@/features/reviews/components/review-list.component";
import { useProductReviews } from "@/features/reviews/hooks/use-reviews.hook";

interface ProductReviewsSectionProps {
  productId: string;
  productName: string;
}

export default function ProductReviewsSection({
  productId,
  productName,
}: ProductReviewsSectionProps) {
  const {
    reviews,
    userReview,
    isLoading,
    isAuthenticated,
  } = useProductReviews(productId);

  return (
    <section className="mt-14 border-t border-primary pt-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">Customers Reviews</h2>
        <ReviewList
          reviews={reviews}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />
        <details className="mt-8">
          <summary className="w-fit cursor-pointer font-semibold text-accent hover:underline">Write or manage your review</summary>
          <div className="mt-5 max-w-3xl">
            <ReviewForm
              key={userReview?.id ?? "new"}
              productId={productId}
              productName={productName}
              userReview={userReview}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </details>
      </div>
    </section>
  );
}
