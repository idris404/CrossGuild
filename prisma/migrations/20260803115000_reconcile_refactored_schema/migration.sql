-- Reconcile databases created from the legacy migration history with the
-- feature-based schema. Every statement is idempotent so this migration is
-- safe both for existing environments and for a clean migration replay.

-- User profile and security fields
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "city" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "country" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "postalCode" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorSecret" TEXT;

-- Checkout fields
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "city" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "country" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "firstName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "isPaid" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "lastName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "orderNumber" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "postalCode" TEXT;

-- Product fields introduced during the refactor
ALTER TABLE "Item" ADD COLUMN IF NOT EXISTS "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "Item" ADD COLUMN IF NOT EXISTS "categoryId" TEXT;
ALTER TABLE "Item" ADD COLUMN IF NOT EXISTS "cost" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "Item" ADD COLUMN IF NOT EXISTS "margin" DOUBLE PRECISION;
ALTER TABLE "Item" ADD COLUMN IF NOT EXISTS "profit" DOUBLE PRECISION;
ALTER TABLE "Item" ADD COLUMN IF NOT EXISTS "totalProfit" DOUBLE PRECISION;

-- Remove superseded direct cart/order relations from the legacy Item model.
ALTER TABLE "Item" DROP CONSTRAINT IF EXISTS "Item_orderId_fkey";
ALTER TABLE "Item" DROP CONSTRAINT IF EXISTS "Item_cartId_fkey";
ALTER TABLE "Item" DROP COLUMN IF EXISTS "orderId";
ALTER TABLE "Item" DROP COLUMN IF EXISTS "cartId";
DROP TABLE IF EXISTS "_CategoryToItem";

ALTER TABLE "Brand" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE IF NOT EXISTS "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "OrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "WishlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "WishlistItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ItemOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "values" TEXT[],
    "itemId" TEXT NOT NULL,
    CONSTRAINT "ItemOption_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ItemOption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "HeroContent" (
    "id" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "highlightedText" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primaryButtonText" TEXT NOT NULL,
    "secondaryButtonText" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "HeroContent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Offer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL DEFAULT 'Free Delivery',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ContactInfo" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "email1" TEXT NOT NULL,
    "email2" TEXT,
    "businessHours" TEXT NOT NULL,
    "mapEmbedUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SocialLinks" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "CartItem_cartId_itemId_key" ON "CartItem"("cartId", "itemId");
CREATE UNIQUE INDEX IF NOT EXISTS "OrderItem_orderId_itemId_key" ON "OrderItem"("orderId", "itemId");
CREATE UNIQUE INDEX IF NOT EXISTS "WishlistItem_userId_itemId_key" ON "WishlistItem"("userId", "itemId");
CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
CREATE INDEX IF NOT EXISTS "PasswordResetToken_email_idx" ON "PasswordResetToken"("email");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Item_categoryId_fkey') THEN
        ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey"
          FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;
