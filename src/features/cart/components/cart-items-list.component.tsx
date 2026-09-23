"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Minus, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import type { CartItem } from "@/features/cart/types/cart.type";

interface CartItemsListProps {
  items: CartItem[];
  updatingItemId: string | null;
  removingItemId: string | null;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function CartItemsList({
  items,
  updatingItemId,
  removingItemId,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemsListProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (itemId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  return (
    <div className="overflow-x-auto bg-transparent">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-primary hover:bg-transparent">
            <TableHead className="font-bold uppercase text-accent">Product</TableHead>
            <TableHead className="font-bold uppercase text-accent">Price</TableHead>
            <TableHead className="font-bold uppercase text-accent">Quantity</TableHead>
            <TableHead className="font-bold uppercase text-accent">Total</TableHead>
            <TableHead className="text-center font-bold uppercase text-accent">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {items.map((item) => {
              const isUpdating =
                updatingItemId === item.id || removingItemId === item.id;

              return (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group border-b border-primary/60 hover:bg-purple-50/40 dark:hover:bg-accent/5"
                  layout
                >
                  <TableCell>
                    <div className="flex items-center">
                      <div className="relative overflow-hidden rounded-md">
                        {imageErrors[item.id] || !item.images[0]?.url ? (
                          <div className="w-20 h-20 flex items-center justify-center bg-muted/30 dark:bg-muted/10 rounded-md mr-4">
                            <ImageIcon className="w-10 h-10 text-muted-foreground" />
                          </div>
                        ) : (
                          <motion.img
                            src={item.images[0]?.url}
                            alt={item.name}
                            className="mr-4 h-24 w-28 object-contain"
                            onError={() => handleImageError(item.id)}
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <div className="max-w-xs">
                        <h3 className="cursor-pointer text-base font-semibold transition-colors hover:text-accent">
                          {item.name}
                        </h3>
                        {item.options?.map((option, idx) => (
                          <p key={idx} className="mt-1 text-xs text-muted-foreground">{option.name}: {option.values.join(", ")}</p>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.price.toFixed(2)} €</TableCell>
                  <TableCell>
                    <div className="flex w-fit items-center overflow-hidden rounded-md bg-muted">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-none border-0 bg-transparent text-foreground shadow-none hover:bg-primary/30 hover:text-foreground"
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={isUpdating}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-none border-0 bg-transparent text-foreground shadow-none hover:bg-primary/30 hover:text-foreground"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={isUpdating}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {(item.price * item.quantity).toFixed(2)} €
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-foreground hover:bg-red-50 hover:text-red-600 dark:text-foreground dark:hover:bg-red-950"
                      onClick={() => onRemoveItem(item.id)}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </Button>
                  </TableCell>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
