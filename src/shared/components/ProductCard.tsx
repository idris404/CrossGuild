import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import {
  checkWishlistItem,
  addWishlistItem,
  removeWishlistItem,
} from "@/features/wishlist/services/wishlist.service";
import { addToCartItem } from "@/features/cart/services/cart.service";

const slideFromBottom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ProductCardProps {
  item: {
    id: string;
    name: string;
    images: { url: string }[];
    averageRating: number; // Modifié de rating à averageRating pour correspondre au schema
    brand?: { name: string }; // Rendu optionnel
    price: number;
    quantity: number;
    slug: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [error, setError] = useState("");

  // Check if item is already in wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const data = await checkWishlistItem(item.id);
        setIsInWishlist(data.inWishlist);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [item.id]);

  const handleBuyNow = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await addToCartItem(item.id, 1);

      if (data.success) {
        router.push("/cart");
      } else {
        setError(data.error || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("An error occurred while adding to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsAddingToWishlist(true);
    try {
      const data = isInWishlist
        ? await removeWishlistItem(item.id)
        : await addWishlistItem(item.id);

      if (data.success) {
        setIsInWishlist(!isInWishlist);
        toast.success(
          isInWishlist ? "Removed from wishlist" : "Added to wishlist"
        );
      } else {
        toast.error(
          data.error ||
            `Failed to ${isInWishlist ? "remove from" : "add to"} wishlist`
        );
      }
    } catch (error) {
      console.error(
        `Error ${isInWishlist ? "removing from" : "adding to"} wishlist:`,
        error
      );
      toast.error(
        `Failed to ${isInWishlist ? "remove from" : "add to"} wishlist`
      );
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <motion.div
      key={item.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={slideFromBottom}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative flex h-full min-h-[350px] flex-col overflow-hidden border-2 border-primary bg-white text-center transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-lg dark:bg-card">
        {/* Wishlist button - positioned absolute in the top right corner */}
        <button
          onClick={handleAddToWishlist}
          disabled={isAddingToWishlist}
          className="absolute right-2 top-2 z-10 rounded-full border border-primary/50 bg-white p-2 opacity-0 shadow-sm transition-all hover:border-accent hover:bg-purple-50 focus-visible:opacity-100 group-hover:opacity-100"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-5 w-5 ${
              isAddingToWishlist
                ? "animate-pulse text-accent"
                : isInWishlist
                  ? "text-accent fill-accent"
                  : "text-gray-400 hover:text-accent"
            }`}
            fill={isInWishlist ? "currentColor" : "none"}
          />
        </button>

        <CardHeader className="p-4 pb-0">
          {" "}
          <div className="relative flex h-[170px] w-full items-center justify-center p-2">
            <Image
              src={item.images[0]?.url || "/images/placeholder-product.svg"}
              alt={item.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== "/images/placeholder-product.svg") {
                  target.src = "/images/placeholder-product.svg";
                }
              }}
            />
          </div>
          <CardTitle className="min-h-10 text-left text-base font-bold leading-5">
            {item.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-0 text-left">
          <div className="flex justify-left items-center my-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.round(item.averageRating || 0)
                    ? "text-secondary"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-base font-bold">{item.price.toFixed(2).replace(".", ",")}€</p>
        </CardContent>
        <CardFooter className="mt-auto flex flex-col justify-center gap-2 p-4 pt-3">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex justify-center gap-2">
            <Button
              className="h-10 bg-accent px-4 text-sm shadow-md hover:bg-[#4f38d8]"
              onClick={handleBuyNow}
              disabled={isLoading || item.quantity <= 0}
            >
              {isLoading ? "Adding..." : "Buy Now"}
            </Button>
            <Link href={`/product/${item.slug}`}>
              <Button
                variant="outline"
                className="h-10 border-2 border-primary px-4 text-sm shadow-none hover:border-accent hover:bg-accent hover:text-white"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
