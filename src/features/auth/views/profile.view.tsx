"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { ProfileInfo } from "@/features/auth/components/profile-info.component";
import { ProfileSettings } from "@/features/auth/components/profile-settings.component";
import { OrderHistory } from "@/features/auth/components/order-history.component";
import { useProfile } from "@/features/auth/hooks/use-profile.hook";
import { useOrders } from "@/features/auth/hooks/use-orders.hook";

function ProfileContent() {
  const {
    session,
    status,
    personalInfoForm,
    passwordChangeForm,
    image,
    imagePreview,
    isUploading,
    isUpdating,
    isChangingPassword,
    handleImageChange,
    onPersonalInfoSubmit,
    onPasswordChangeSubmit,
  } = useProfile();

  const ordersState = useOrders();

  if (status === "loading") {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  return (
    <div className="cg-container pb-10 pt-28">
      <div className="mb-7 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-accent">Home</Link> <span className="mx-2">›</span> Account
      </div>

      <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <section>
          <h1 className="mb-5 text-lg font-bold uppercase text-accent">Account Informations :</h1>
          <div className="space-y-4 text-base">
            <p className="flex items-center gap-3"><User className="h-5 w-5" /><strong>Name :</strong> <span className="text-muted-foreground">{session?.user?.name || personalInfoForm.getValues("name") || "—"}</span></p>
            <p className="flex items-center gap-3"><Mail className="h-5 w-5" /><strong>E-mail :</strong> <span className="text-muted-foreground">{session?.user?.email || personalInfoForm.getValues("email") || "—"}</span></p>
            <p className="flex items-center gap-3"><MapPin className="h-5 w-5" /><strong>Your Address :</strong> <span className="text-muted-foreground">{personalInfoForm.getValues("city") || "—"}</span></p>
            <p className="flex items-center gap-3"><Phone className="h-5 w-5" /><strong>Phone Number :</strong> <span className="text-muted-foreground">{personalInfoForm.getValues("phone") || "—"}</span></p>
          </div>
        </section>

        <section className="h-fit rounded-md border-2 border-accent bg-background">
          <h2 className="border-b-2 border-accent px-4 py-2 text-lg font-semibold">Account Settings</h2>
          <ul className="space-y-2 px-6 py-4 text-muted-foreground">
            <li><a href="#order-history" className="hover:text-accent">• Order history</a></li>
            <li><Link href="/wishlist" className="hover:text-accent">• Edit your favorites</Link></li>
            <li><button onClick={() => signOut()} className="hover:text-accent">• Logout</button></li>
          </ul>
        </section>
      </div>

      <details className="mb-10">
        <summary className="w-fit cursor-pointer font-semibold text-accent underline underline-offset-4">Edit account information</summary>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <ProfileInfo
            form={personalInfoForm}
            currentImage={session?.user?.image}
            imagePreview={imagePreview}
            hasNewImage={!!image}
            isUploading={isUploading}
            isUpdating={isUpdating}
            onImageChange={handleImageChange}
            onSubmit={onPersonalInfoSubmit}
          />
          <ProfileSettings
            form={passwordChangeForm}
            isChangingPassword={isChangingPassword}
            onSubmit={onPasswordChangeSubmit}
          />
        </div>
      </details>

      <section id="order-history">
          <OrderHistory
            orders={ordersState.orders}
            isLoading={ordersState.isLoading}
            currentPage={ordersState.currentPage}
            totalPages={ordersState.totalPages}
            selectedOrder={ordersState.selectedOrder}
            isOrderDetailsOpen={ordersState.isOrderDetailsOpen}
            setIsOrderDetailsOpen={ordersState.setIsOrderDetailsOpen}
            isCancelDialogOpen={ordersState.isCancelDialogOpen}
            setIsCancelDialogOpen={ordersState.setIsCancelDialogOpen}
            onViewOrder={ordersState.openOrderDetails}
            onCancelOrder={ordersState.openCancelDialog}
            onConfirmCancel={ordersState.handleCancelOrder}
            onPageChange={ordersState.fetchPage}
            isCancelling={ordersState.isCancelling}
          />
      </section>
    </div>
  );
}

export default function ProfileView() {
  return (
    <Suspense fallback={<div className="container mx-auto py-10">Loading...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
