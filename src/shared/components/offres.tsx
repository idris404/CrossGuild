"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { fetchOffers as getOffers } from "@/features/cms/services/cms.service";

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
}

const ExclusiveDeals = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOffers();
  }, []);

  const fallbackOffers: Offer[] = [
    { id: "first-order", title: "10% Off on Your First Order", description: "Use Code FIRST10", image: "/sale.svg", buttonLabel: "GET A REDUCTION" },
    { id: "free-delivery", title: "Free Shipping on Orders Over $50", description: "delivery within 48 hours", image: "/ship.svg", buttonLabel: "FREE DELIVERY" },
  ];
  const displayOffers = offers.length ? offers.slice(0, 2) : fallbackOffers;

  return (
    <section className="cg-section text-left">
      <div className="cg-container">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="cg-title mb-7 w-fit text-accent"
      >
        Exclusive Deals{" "}
        <span className="text-black dark:text-white">You Can&apos;t Miss!</span>
      </motion.h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {isLoading ? <div className="col-span-full h-52 animate-pulse rounded-md bg-muted" /> : displayOffers.map((offer, index) => (
          <motion.div
            key={offer.id}
            className="group relative flex min-h-[240px] justify-between overflow-hidden rounded-md bg-gradient-to-r from-[#6047ec] to-[#988ae6] p-8 text-white shadow-md transition-shadow hover:shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideFromLeft}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="relative z-10 flex w-3/5 flex-col justify-center pr-4">
              {/* Bouton amélioré avec une forme coupante plus propre */}
              <div className="mb-4">
                <div className="inline-block relative">
                  <div className="bg-[#6851cf] py-2 pl-4 pr-7 text-xs font-semibold text-white">
                    {offer.buttonLabel || "Free Delivery"}
                  </div>
                  <div className="absolute right-0 top-0 h-full w-5 origin-top-left translate-x-1/2 skew-x-[30deg] bg-[#6851cf]" />
                </div>
              </div>

              <h2 className="mb-2 text-xl font-bold md:text-2xl">
                {offer.title}
              </h2>
              <p className="text-2xl font-bold md:text-3xl">
                {offer.description}
              </p>
            </div>

            {/* Image à droite avec taille fixe stricte */}
            <div className="relative z-10 flex w-2/5 shrink-0 items-center justify-center">
              <div className="relative h-[150px] w-full max-w-[180px]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="200px"
                  className="drop-shadow-md"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-10 flex min-h-[300px] items-center justify-between overflow-hidden rounded-md bg-[#d8d3ef] p-8 shadow-md md:p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideFromLeft}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10 w-full md:w-3/5">
          <div className="mb-5 w-fit bg-primary px-4 py-2 text-xs font-semibold text-white">Subscribe To Us</div>
          <h2 className="text-3xl font-bold text-black md:text-4xl">Stay Ahead of the <span className="text-accent">Game!</span></h2>
          <p className="my-5 max-w-2xl text-sm text-black md:text-base">Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and gaming tips. Plus, enjoy 10% off your next order when you sign up!</p>
          <div className="flex max-w-xl">
            <Input type="email" placeholder="Your Email" aria-label="Newsletter email" className="h-12 rounded-r-none border-0 bg-white text-black" />
            <Button className="h-12 rounded-l-none px-6">Subscribe</Button>
          </div>
        </div>
        <div className="relative hidden h-[240px] w-2/5 md:block">
          <Image src="/news.svg" alt="Gaming newsletter" fill className="object-contain" />
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveDeals;
