"use client";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchHeroContent } from "@/features/cms/services/cms.service";

interface HeroContent {
  id: string;
  tagline: string;
  heading: string;
  highlightedText: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage: string;
}

const HERO_FALLBACK: HeroContent = {
  id: "",
  tagline: "Take Your Gaming to the Next Level",
  heading: "High-Performance Gaming",
  highlightedText: "Accessories",
  description:
    "Equip yourself with high-performance gear designed to boost your gameplay, offering precision, comfort, and durability for every battle.",
  primaryButtonText: "Shop Now",
  secondaryButtonText: "New Arrivals!",
  backgroundImage: "/HeroImg.svg",
};

export const HeroSection = () => {
  const [content, setContent] = useState<HeroContent>(HERO_FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await fetchHeroContent();
        setContent({
          ...HERO_FALLBACK,
          ...data,
          tagline: data?.tagline || HERO_FALLBACK.tagline,
          heading: data?.heading || HERO_FALLBACK.heading,
          highlightedText: data?.highlightedText || HERO_FALLBACK.highlightedText,
          description: data?.description || HERO_FALLBACK.description,
          primaryButtonText: data?.primaryButtonText || HERO_FALLBACK.primaryButtonText,
          secondaryButtonText: data?.secondaryButtonText || HERO_FALLBACK.secondaryButtonText,
          backgroundImage: data?.backgroundImage || HERO_FALLBACK.backgroundImage,
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
      <div className="relative mt-20 min-h-[500px] animate-pulse bg-muted/30">
        <div className="h-8 w-64 bg-muted rounded mb-4"></div>
        <div className="h-16 w-96 bg-muted rounded mb-4"></div>
        <div className="h-24 w-full max-w-3xl bg-muted rounded mb-6"></div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-muted rounded"></div>
          <div className="h-12 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative isolate mt-20 flex min-h-[500px] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center text-white md:min-h-[540px]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.backgroundImage})` }}
        role="img"
        aria-label="Gaming accessories background"
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Contenu texte avec animations */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-base italic tracking-wide text-white md:text-lg"
      >
        {content.tagline}
      </motion.h2>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-3 text-4xl font-bold leading-tight md:text-5xl"
      >
        {content.heading}
        <br />
        <span className="text-accent">
          {content.highlightedText}
        </span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-100 md:text-base"
      >
        {content.description}
      </motion.p>

      {/* Boutons avec animations améliorées */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
      >
        <Link href="#top-selling">
          <Button className="h-12 bg-accent px-6 text-base shadow-md hover:bg-[#4f38d8]">
            {content.primaryButtonText}
          </Button>
        </Link>
        <Link href={"/products"}>
          <Button
            variant="outline"
            className="h-12 border-2 border-primary bg-transparent px-6 text-base text-white shadow-md hover:bg-primary hover:text-white"
          >
            {content.secondaryButtonText}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};
