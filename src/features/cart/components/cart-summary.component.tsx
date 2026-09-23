"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";

interface CartSummaryProps {
  subtotal: number;
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  const router = useRouter();

  return (
    <div className="border-b border-t border-primary py-6 dark:border-primary">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Button
          variant="outline"
          className="order-2 border-2 border-accent px-8 text-foreground hover:bg-accent hover:text-white sm:order-1"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </Button>
        <div className="order-1 text-right sm:order-2">
          <p className="mb-3 text-left font-bold uppercase text-accent sm:text-right">Subtotal</p>
          <p className="text-2xl font-bold">{subtotal.toFixed(2).replace(".", ",")}€</p>
          <p className="text-sm text-muted-foreground">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
