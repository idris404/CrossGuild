"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/shared/components/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchPublishedProducts } from "@/features/products/services/product.service";

interface Product {
  id: string;
  name: string;
  price: number;
  averageRating: number; // Changé de rating à averageRating pour correspondre au schema
  images: { url: string }[];
  brand?: { name: string }; // Rendu optionnel
  quantity: number;
  topSelling: number;
  slug: string; // Added slug property
}

const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-muted rounded-lg h-64 mb-4"></div>
    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
    <div className="h-6 bg-muted rounded w-1/4"></div>
  </div>
);

type TopSellingGamingGearProps = {
  title?: string;
  highlightedText?: string;
  showLink?: boolean;
  sectionId?: string;
};

export const TopSellingGamingGear = ({
  title = "Top-Selling",
  highlightedText = "Gaming Gear",
  showLink = true,
  sectionId = "top-selling",
}: TopSellingGamingGearProps = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const data = await fetchPublishedProducts("topSelling");
        const sortedProducts = data
          .filter((product: Product) => product.topSelling > 0)
          .sort((a: Product, b: Product) => b.topSelling - a.topSelling)
          .slice(0, 4); // Limit to only 4 products
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, []);

  return (
    <section id={sectionId} className="cg-section">
      <div className="cg-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <h2 className="cg-title">
              {title} <span className="text-accent">{highlightedText}</span>
            </h2>
          </div>
          {showLink && <Link
            href="/products"
            className="shrink-0 font-semibold text-accent underline decoration-primary underline-offset-4 transition-colors hover:text-[#4f38d8]"
          >
            See More
          </Link>}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductSkeleton />
                </motion.div>
              ))}
            </>
          ) : Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard item={product} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                Aucun produit disponible pour le moment
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
