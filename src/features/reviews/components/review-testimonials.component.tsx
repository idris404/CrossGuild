"use client";

import { Marquee } from "@/shared/components/magicui/marquee";
import ReviewCard from "@/features/reviews/components/review-card.component";
import { useFeaturedReviews } from "@/features/reviews/hooks/use-reviews.hook";

export default function ReviewTestimonials() {
  const { reviews, isLoading } = useFeaturedReviews();

  if (isLoading) {
    return (
      <div className="my-28 w-full px-4">
        <div className="mb-12 md:ml-12 lg:ml-24 xl:ml-32">
          <div className="h-10 w-96 bg-muted rounded animate-pulse mb-3"></div>
          <div className="h-4 w-64 bg-muted/60 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-xl h-48 w-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="cg-section w-full overflow-hidden">
      <div className="cg-container mb-6">
        <h2 className="cg-title w-fit text-foreground">
          What Our <span className="text-accent">Customers Say</span>
        </h2>
      </div>

      <div className="relative py-2">
        {reviews.length > 0 && (
          <Marquee
            className="[--gap:1rem] [--duration:45s]"
            pauseOnHover
            repeat={2}
          >
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                variant="testimonial"
                review={review}
              />
            ))}
          </Marquee>
        )}

        {reviews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-20">💬</div>
            <p className="text-foreground/60 text-lg">
              Aucun avis disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
