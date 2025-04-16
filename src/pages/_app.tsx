import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// List of public routes that don't require authentication
const publicRoutes = ["/login", "/signup"];

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}
