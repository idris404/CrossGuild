"use client";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCategoryHeroContent } from "@/features/cms/services/cms.service";

interface CategoryHeroContent {
  id: string;
  heading: string;
  highlightedText: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
}

const CATEGORY_HERO_FALLBACK: CategoryHeroContent = {
  id: "",
  heading: "Discover the Ultimate",
  highlightedText: "Gaming Gear",
  description:
    "Explore top-tier gaming accessories designed to enhance your performance and take your gaming to the next level. Find the perfect gear and dominate every session.",
  buttonText: "Explore Categories",
  backgroundImage: "/CateImg.svg",
};

const HeroSection = () => {
  const [content, setContent] = useState<CategoryHeroContent>(CATEGORY_HERO_FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await fetchCategoryHeroContent();
        setContent({
          ...CATEGORY_HERO_FALLBACK,
          ...data,
          heading: data?.heading || CATEGORY_HERO_FALLBACK.heading,
          highlightedText: data?.highlightedText || CATEGORY_HERO_FALLBACK.highlightedText,
          description: data?.description || CATEGORY_HERO_FALLBACK.description,
          buttonText: data?.buttonText || CATEGORY_HERO_FALLBACK.buttonText,
          backgroundImage: data?.backgroundImage || CATEGORY_HERO_FALLBACK.backgroundImage,
        });
      } catch {
        // Keep the original mockup content when the optional CMS is unavailable.
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative isolate flex min-h-[310px] flex-col items-center justify-center px-4 py-16 text-center text-white md:min-h-[340px]">
      {/* Image de fond avec overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.backgroundImage})` }}
        role="img"
        aria-label="Gaming categories background"
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Contenu texte */}
      <h1 className="text-4xl font-bold leading-tight md:text-5xl">
        {content.heading} <br></br>
        <span className="text-accent">{content.highlightedText}</span>
      </h1>
      <p className="mt-4 text-gray-100 max-w-3xl">{content.description}</p>

      {/* Boutons */}
      <div className="mt-6 flex justify-center gap-4">
        <Link href="#categories">
          <Button
            variant="outline"
            className="h-11 border-2 border-primary bg-transparent px-6 text-base text-white shadow-md hover:bg-primary hover:text-white"
          >
            {content.buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
