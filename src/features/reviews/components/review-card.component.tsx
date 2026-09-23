"use client";

import { format } from "date-fns";
import { CheckCircle, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Card, CardContent } from "@/shared/components/ui/card";
import type {
  FeaturedReview,
  ProductReview,
} from "@/features/reviews/types/review.type";

function getInitials(name: string | null | undefined) {
  if (!name || name === "Anonymous" || name === "Anonymous User") return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

type ProductReviewCardProps = {
  review: ProductReview;
  variant?: "product";
};

type TestimonialReviewCardProps = {
  review: FeaturedReview;
  variant: "testimonial";
};

type ReviewCardProps = ProductReviewCardProps | TestimonialReviewCardProps;

export default function ReviewCard(props: ReviewCardProps) {
  if (props.variant === "testimonial") {
    return <TestimonialCard review={props.review} />;
  }

  return <ProductCard review={props.review} />;
}

function TestimonialCard({ review }: { review: FeaturedReview }) {
  return (
    <figure className="relative flex h-[190px] w-[360px] cursor-default flex-col overflow-hidden rounded-md border-2 border-primary bg-background p-5 shadow-[0_3px_5px_rgba(0,0,0,0.18)] transition-[border-color,box-shadow] hover:border-accent hover:shadow-lg sm:w-[420px]">
      <div className="relative flex flex-row items-center gap-3">
        <Avatar className="w-8 h-8">
          {review.user.image && (
            <AvatarImage
              src={review.user.image}
              alt={`${review.user.name}'s profile`}
            />
          )}
          <AvatarFallback>{getInitials(review.user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="text-base font-bold text-foreground">
            {review.user.name}
          </figcaption>
        </div>
        <span className="ml-auto text-xs font-bold underline">Verified Purchase</span>
      </div>
      <div className="ml-11 -mt-1 text-lg leading-none text-primary">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
      </div>
      <div className="mt-5 line-clamp-3 text-sm leading-snug text-foreground/80">{review.content}</div>
      <div className="mt-auto text-xs font-medium text-foreground">Reviewed purchase</div>
    </figure>
  );
}

function ProductCard({ review }: { review: ProductReview }) {
  return (
    <Card className="h-full border-2 border-primary bg-background transition-[border-color,box-shadow] hover:border-accent hover:shadow-lg">
      <CardContent className="relative flex h-full min-h-[190px] flex-col overflow-hidden p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-10 w-10 border border-primary">
                <AvatarImage src={review.user.image || undefined} />
                <AvatarFallback className="bg-background font-semibold text-foreground">
                  {getInitials(review.user.name)}
                </AvatarFallback>
              </Avatar>
              {review.isVerifiedPurchase && (
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <p className="font-bold text-foreground">
                {review.user.name || "Anonymous"}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 transition-colors ${
                        star <= review.rating
                          ? "fill-primary text-primary"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {review.isVerifiedPurchase && (
            <div className="text-xs font-bold text-foreground underline">
              <span>Verified Purchase</span>
            </div>
          )}
        </div>

        <div className="mt-5">
          {review.content.trim() !== "" ? (
            <div>
              <p className="text-sm leading-snug text-foreground/80">{review.content}</p>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground italic">(No comment provided)</p>
            </div>
          )}
        </div>
        <p className="mt-auto pt-4 text-xs font-medium text-foreground">Reviewed on {format(new Date(review.createdAt), "d MMMM yyyy")}</p>
      </CardContent>
    </Card>
  );
}
