import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { E2E_USER } from "./helpers/auth";

export default async function globalSetup() {
  if (!process.env.DATABASE_URL) {
    console.warn("Skipping E2E user setup: DATABASE_URL is not configured.");
    return;
  }

  const prisma = new PrismaClient();

  try {
    const hashedPassword = await bcrypt.hash(E2E_USER.password, 10);

    const user = await prisma.user.upsert({
      where: { email: E2E_USER.email },
      update: {
        name: E2E_USER.name,
        password: hashedPassword,
        isAdmin: false,
      },
      create: {
        name: E2E_USER.name,
        email: E2E_USER.email,
        password: hashedPassword,
        isAdmin: false,
        cart: {
          create: {},
        },
      },
    });

    await prisma.cart.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    await prisma.cartItem.deleteMany({
      where: { cart: { userId: user.id } },
    });

    const category = await prisma.category.upsert({
      where: { name: "E2E Test Gear" },
      update: {},
      create: {
        name: "E2E Test Gear",
        description: "Deterministic category fixture for browser tests.",
      },
    });

    await prisma.item.upsert({
      where: { slug: "e2e-gaming-mouse" },
      update: {
        name: "E2E Gaming Mouse",
        price: 59.99,
        quantity: 10,
        isPublished: true,
        categoryId: category.id,
      },
      create: {
        name: "E2E Gaming Mouse",
        slug: "e2e-gaming-mouse",
        sku: "E2E-MOUSE-001",
        description: "Deterministic product fixture for browser tests.",
        price: 59.99,
        quantity: 10,
        isPublished: true,
        categoryId: category.id,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
