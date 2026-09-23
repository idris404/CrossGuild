"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import crossguild from "@/public/CrossGuild.svg";
import crossguildDark from "@/public/CrossGuild-dark.svg";
import paye from "@/public/paye.svg";
import { useTheme } from "next-themes";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

const primaryLinks = [
  ["Home", "/"],
  ["Categories", "/categories"],
  ["About Us", "/about"],
  ["FAQ", "/#faq"],
] as const;

const navigationLinks = [
  ["Search", "/products"],
  ["All Collections", "/categories"],
  ["All Products", "/products"],
  ["Blog Page", "/contact"],
] as const;

function FooterLinks({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h3 className="mb-4 text-base font-bold">{title}</h3>
      <nav className="flex flex-col gap-3 text-sm">
        {links.map(([label, href]) => (
          <Link key={`${title}-${label}`} href={href} className="w-fit transition-colors hover:text-accent hover:underline">
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function FooterSection() {
  const { theme } = useTheme();

  return (
    <footer className="cg-container mt-10">
      <div className="border-t border-primary py-7">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.25fr_.8fr_.8fr_.8fr_1.55fr]">
          <div className="flex gap-5">
            <Image src={theme === "dark" ? crossguildDark : crossguild} alt="CrossGuild" width={74} height={74} className="h-[74px] w-[74px] object-contain" />
            <div>
              <h3 className="mb-4 text-base font-bold">Office</h3>
              <div className="space-y-3 text-sm">
                <p>Oran, Algeria 31000</p>
                <p>213541772380+</p>
                <p>CrossGuild@contact.com</p>
              </div>
            </div>
          </div>

          <FooterLinks title="Quick Links" links={primaryLinks} />
          <FooterLinks title="Navigation" links={navigationLinks} />
          <FooterLinks title="Quick Links" links={primaryLinks} />

          <div>
            <h3 className="mb-3 text-base font-bold">Share</h3>
            <div className="mb-4 flex items-center gap-4">
              <Link href="#" aria-label="Instagram" className="transition-colors hover:text-accent"><InstagramLogoIcon /></Link>
              <Link href="#" aria-label="YouTube" className="transition-colors hover:text-accent"><FaYoutube /></Link>
              <Link href="#" aria-label="Facebook" className="transition-colors hover:text-accent"><FaFacebookF /></Link>
              <Link href="#" aria-label="Twitter" className="transition-colors hover:text-accent"><TwitterLogoIcon /></Link>
            </div>
            <h3 className="mb-3 text-base font-bold">Subscribe To NewsLetter</h3>
            <div className="flex">
              <Input type="email" aria-label="Footer newsletter email" placeholder="Your Email" className="h-9 rounded-r-none border-gray-300 bg-white text-black" />
              <Button className="h-9 rounded-l-none px-4 text-xs">Subscribe</Button>
            </div>
            <Image src={paye} alt="Accepted payment methods" width={145} className="mt-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-primary py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© 2024 CrossGuild. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-accent">Privacy Policy</Link>
          <Link href="#" className="hover:text-accent">Legal Notice</Link>
        </div>
      </div>
    </footer>
  );
}
