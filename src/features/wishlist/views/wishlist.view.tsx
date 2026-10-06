"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { LoadingState } from "@/shared/components/ui/loading-state";
import { WishlistGrid } from "@/features/wishlist/components/wishlist-grid.component";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist.hook";

export default function WishlistView() {
  const router = useRouter();
  const { status } = useSession();
  const {
    items,
    isLoading,
    isAuthenticated,
    removeItem,
    addToCart,
    actionLoadingItemId,
  } = useWishlist();

  if (status === "loading" || (isAuthenticated && isLoading)) {
    return (
      <LoadingState type="product-list" title="Loading your wishlist..." />
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="cg-container py-8">
        <div className="mx-auto max-w-6xl rounded-md border-2 border-primary bg-background py-12 text-center shadow-[0_3px_5px_rgba(0,0,0,0.18)] transition-[border-color,box-shadow] hover:border-accent hover:shadow-lg">
          <Heart className="mx-auto mb-4 h-16 w-16 text-primary" />
          <p className="mb-4 text-xl">Sign in to view your wishlist</p>
          <Button
            onClick={() => router.push("/login?callbackUrl=/wishlist")}
            size="lg"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cg-container py-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
          <p className="text-muted-foreground">
            {items.length} items saved for later
          </p>
        </motion.div>

        <WishlistGrid
          items={items}
          actionLoadingItemId={actionLoadingItemId}
          onRemoveItem={removeItem}
          onAddToCart={(itemId) => addToCart({ itemId })}
        />
      </div>
    </div>
  );
}
