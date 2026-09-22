import DevPasswordTokensView from "@/features/auth/views/dev-password-tokens.view";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function DevPasswordTokensPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <DevPasswordTokensView />;
}
