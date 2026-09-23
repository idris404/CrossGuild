import { HeroSection } from "@/shared/components/HeroSection";
import ReviewTestimonials from "@/features/reviews/components/review-testimonials.component";
import { TopSellingGamingGear } from "@/shared/components/TopSellingGamingGear";
import { auth } from "@/shared/lib/auth";
import Offres from "@/shared/components/offres";
import Faqs from "@/shared/components/fasq";

export default async function HomeView() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await auth();

  return (
    <div className="flex flex-col bg-background">
      <HeroSection />
      <TopSellingGamingGear />
      <ReviewTestimonials />
      <Offres />
      <Faqs />
    </div>
  );
}
