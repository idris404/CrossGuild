"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { CreditCard, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { LoadingState } from "@/shared/components/ui/loading-state";
import { CartItemsList } from "@/features/cart/components/cart-items-list.component";
import { CartSummary } from "@/features/cart/components/cart-summary.component";
import { DeliveryForm } from "@/features/cart/components/delivery-form.component";
import { useCart } from "@/features/cart/hooks/use-cart.hook";
import type { DeliveryInfo } from "@/features/cart/validations/cart.schema";

export default function CartView() {
  const router = useRouter();
  const { status } = useSession();
  const {
    items,
    subtotal,
    isLoading,
    isAuthenticated,
    updateQuantity,
    removeItem,
    checkout,
    isUpdating,
    isRemoving,
    isCheckingOut,
  } = useCart();

  const handleCheckout = async (deliveryInfo: DeliveryInfo) => {
    try {
      const data = await checkout(deliveryInfo);

      if (data.success) {
        router.push(`/order-confirmation?orderId=${data.order.id}`);
        toast.success("Order created successfully!");
      } else {
        toast.error(data.error || "Failed to create order");
      }
    } catch {
      toast.error("An error occurred while creating your order");
    }
  };

  if (status === "loading" || (isAuthenticated && isLoading)) {
    return <LoadingState type="cart" title="Loading your cart..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="cg-container py-8">
        <div className="mx-auto mb-7 max-w-6xl text-sm text-muted-foreground">
          Home <span className="mx-2">›</span> Cart
        </div>
        <div className="mx-auto max-w-6xl rounded-md border-2 border-primary bg-background py-12 text-center shadow-[0_3px_5px_rgba(0,0,0,0.18)] transition-[border-color,box-shadow] hover:border-accent hover:shadow-lg">
          <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-primary" />
          <p className="mb-4 text-xl">Sign in to view your cart</p>
          <Button
            onClick={() => router.push("/login?callbackUrl=/cart")}
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
          className="mb-7 text-sm text-muted-foreground"
        >
          Home <span className="mx-2">›</span> Cart
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-md border-2 border-primary bg-background py-12 text-center shadow-[0_3px_5px_rgba(0,0,0,0.18)] transition-[border-color,box-shadow] hover:border-accent hover:shadow-lg"
          >
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-primary" />
            <p className="mb-4 text-xl">Your cart is empty</p>
            <p className="mb-6 text-muted-foreground">
              Add items to your cart to proceed with checkout
            </p>
            <Button
              onClick={() => router.push("/")}
              size="lg"
            >
              Continue Shopping
            </Button>
          </motion.div>
        ) : (
          <div>
            <div>
              <CartItemsList
                items={items}
                updatingItemId={isUpdating}
                removingItemId={isRemoving}
                onUpdateQuantity={(itemId, quantity) =>
                  updateQuantity({ itemId, quantity })
                }
                onRemoveItem={removeItem}
              />
              <CartSummary subtotal={subtotal} />
            </div>

            <details className="mt-5 max-w-xl">
              <summary className="inline-flex h-11 cursor-pointer list-none items-center rounded-md bg-accent px-8 font-semibold text-white shadow-md transition-colors hover:bg-[#4f38d8]">
                Buy It Now
              </summary>
              <Card className="mt-5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-accent" />
                    <CardTitle>Checkout</CardTitle>
                  </div>
                  <CardDescription>
                    Enter your delivery information to complete the order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DeliveryForm
                    subtotal={subtotal}
                    isSubmitting={isCheckingOut}
                    isDisabled={items.length === 0}
                    onSubmit={handleCheckout}
                  />
                </CardContent>
              </Card>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
