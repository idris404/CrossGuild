import { Item } from "@/shared/components/ui/item";
import {
  Gamepad2,
  CheckCircle2,
  Truck,
  Users,
  Sparkles,
  GaugeCircle,
  UsersRound,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";
import Faqs from "@/shared/components/fasq";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export default function AboutView() {
  return (
    <div className="bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-[340px] w-full items-center justify-center md:h-[380px]">
        <Image
          src="/about-bg.png"
          alt="Gaming keyboard background"
          fill
          className="object-cover object-center brightness-[.55]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-accent font-medium text-sm md:text-base mb-2 tracking-widest uppercase">
            Level Up Your Game
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            CrossGuild Store
          </h1>
          <a
            href="#mission"
            className="inline-block rounded-md border-2 border-primary bg-transparent px-6 py-2 font-semibold text-white shadow transition-colors hover:bg-primary"
          >
            Learn More About CrossGuild
          </a>
        </div>
      </section>

      {/* How We Make Gaming Better */}
      <section className="cg-container bg-background py-12">
        <h2 className="text-center text-accent font-semibold text-sm md:text-base mb-10 tracking-widest uppercase">
          How We Make Gaming Better
        </h2>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 md:flex-row md:gap-0">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-accent/20 rounded-full p-3 mb-3">
              <Gamepad2 className="w-7 h-7 text-accent" />
            </div>
            <div className="font-semibold text-lg mb-1">CrossGuild Store</div>
            <div className="text-muted-foreground text-sm max-w-[220px]">
              We test and guarantee each product to ensure top performance and
              durability
            </div>
          </div>
          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center mx-2">
            <div className="w-12 h-1 bg-accent rounded-full mt-8" />
            <div className="w-0 h-0 border-t-8 border-t-accent border-x-8 border-x-transparent" />
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-background border-2 border-accent rounded-full p-3 mb-3">
              <CheckCircle2 className="w-7 h-7 text-accent" />
            </div>
            <div className="font-semibold text-lg mb-1">
              Quality Gear You Can Trust
            </div>
            <div className="text-muted-foreground text-sm max-w-[220px]">
              We test and guarantee each product to ensure top performance and
              durability.
            </div>
          </div>
          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center mx-2">
            <div className="w-12 h-1 bg-accent rounded-full mt-8" />
            <div className="w-0 h-0 border-t-8 border-t-accent border-x-8 border-x-transparent" />
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-background border-2 border-accent rounded-full p-3 mb-3">
              <Truck className="w-7 h-7 text-accent" />
            </div>
            <div className="font-semibold text-lg mb-1">
              Fast & Secure Delivery
            </div>
            <div className="text-muted-foreground text-sm max-w-[220px]">
              Get your orders swiftly and securely with our trusted shipping
              partners.
            </div>
          </div>
          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center mx-2">
            <div className="w-12 h-1 bg-accent rounded-full mt-8" />
            <div className="w-0 h-0 border-t-8 border-t-accent border-x-8 border-x-transparent" />
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-background border-2 border-accent rounded-full p-3 mb-3">
              <Users className="w-7 h-7 text-accent" />
            </div>
            <div className="font-semibold text-lg mb-1">Join the Community</div>
            <div className="text-muted-foreground text-sm max-w-[220px]">
              Connect with fellow gamers, access exclusive content, and stay
              updated on gaming trends.
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section id="mission" className="cg-container py-10">
        <h2 className="text-center text-accent font-semibold text-sm md:text-base mb-3 tracking-widest uppercase">
          Our Mission
        </h2>
        <h3 className="text-center text-2xl md:text-3xl font-bold mb-5">
          By Gamers, For Gamers
        </h3>
        <p className="text-center max-w-2xl mx-auto text-muted-foreground mb-10">
          We’re a team of passionate gamers and tech enthusiasts who understand
          the importance of high-performance gear. Our mission is simple: to
          bring the best in gaming equipment to every gamer, from casual players
          to competitive pros. We know what it takes to level up your gaming
          experience, and we’re here to make sure you have the tools to do it.
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden border-2 border-accent bg-white divide-y-2 divide-accent dark:bg-background md:grid-cols-2 md:divide-x-2">
          {/* By Gamers, For Gamers */}
          <Item className="flex flex-col items-center justify-center text-center h-full p-8 bg-white dark:bg-background text-foreground">
            <div className="flex items-center justify-center mb-3 gap-3">
              <Sparkles className="w-7 h-7 text-accent" />
              <span className="text-xl font-bold text-foreground">
                By Gamers, For Gamers
              </span>
            </div>
            <div className="text-muted-foreground text-base text-center">
              We believe that every gamer deserves reliable, top-quality gear.
              Our team tests every product rigorously to ensure it meets the
              standards we would expect ourselves. If it doesn’t impress us, it
              won’t make it to you.
            </div>
          </Item>
          {/* Innovation & Performance */}
          <Item className="flex flex-col items-center justify-center text-center h-full p-8 bg-white dark:bg-background text-foreground">
            <div className="flex items-center justify-center mb-3 gap-3">
              <GaugeCircle className="w-7 h-7 text-accent" />
              <span className="text-xl font-bold text-foreground">
                Innovation & Performance
              </span>
            </div>
            <div className="text-muted-foreground text-base text-center">
              The gaming world never stops evolving, and neither do we. We stay
              at the forefront of technology, continuously updating our catalog
              to bring you the latest innovations and performance-enhancing
              equipment.
            </div>
          </Item>
          {/* Community Focus */}
          <Item className="flex flex-col items-center justify-center text-center h-full p-8 bg-white dark:bg-background text-foreground">
            <div className="flex items-center justify-center mb-3 gap-3">
              <UsersRound className="w-7 h-7 text-accent" />
              <span className="text-xl font-bold text-foreground">
                Community Focus
              </span>
            </div>
            <div className="text-muted-foreground text-base text-center">
              Gaming is more than a hobby; it’s a lifestyle. We’re dedicated to
              building a supportive and inclusive gaming community where
              everyone feels welcome.
            </div>
          </Item>
          {/* Commitment to Gamers */}
          <Item className="flex flex-col items-center justify-center text-center h-full p-8 bg-white dark:bg-background text-foreground">
            <div className="flex items-center justify-center mb-3 gap-3">
              <HeartHandshake className="w-7 h-7 text-accent" />
              <span className="text-xl font-bold text-foreground">
                Commitment to Gamers
              </span>
            </div>
            <div className="text-muted-foreground text-base text-center">
              Gaming is more than a hobby; it’s a lifestyle. We’re dedicated to
              building a supportive and inclusive gaming community where
              everyone feels welcome.
            </div>
          </Item>
        </div>
      </section>
      <section className="cg-container py-8">
        <div className="flex min-h-[300px] items-center justify-between overflow-hidden rounded-md border-2 border-sky-500 bg-[#d8d3ef] p-8 shadow-md md:p-10">
          <div className="w-full md:w-3/5">
            <div className="mb-5 w-fit bg-primary px-4 py-2 text-xs font-semibold text-white">Subscribe To Us</div>
            <h2 className="text-3xl font-bold text-black md:text-4xl">Stay Ahead of the <span className="text-accent">Game!</span></h2>
            <p className="my-5 text-sm text-black md:text-base">Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and gaming tips. Plus, enjoy 10% off your next order when you sign up!</p>
            <div className="flex max-w-xl"><Input type="email" aria-label="Newsletter email" placeholder="Your Email" className="h-12 rounded-r-none border-0 bg-white text-black" /><Button className="h-12 rounded-l-none px-6">Subscribe</Button></div>
          </div>
          <div className="relative hidden h-[230px] w-2/5 md:block"><Image src="/news.svg" alt="Gaming newsletter" fill className="object-contain" /></div>
        </div>
      </section>
      <Faqs />
    </div>
  );
}
