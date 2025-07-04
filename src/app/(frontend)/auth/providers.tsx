"use client";

import { authClient } from "@/server/auth/client";
import { api } from "@/trpc/react";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: providers = [] } = api.settings.socialAuthProviders.useQuery();

  return (
    <AuthUIProviderTanstack
      authClient={authClient}
      rememberMe={true}
      providers={providers}
      navigate={(href: string) => router.push(href)}
      persistClient={false}
      replace={(href: string) => router.replace(href)}
      onSessionChange={() => router.refresh()}
      settingsURL="/dashboard/settings/profile"
    >
      {children}
    </AuthUIProviderTanstack>
  );
}
