"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "../_components/Header";
import { useUserStore } from "../_store/use-userStore";
import { useEffect } from "react";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { email } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const isLoginPage = pathname.startsWith("/login");

    if (!email && !isLoginPage) {
      router.replace("/login");
    }
  }, [email, pathname, router]);

  return (
    <>
      <Header />
      <link rel="preload" href="/app/global.css" as="style" />
      <main className="pt-[72px]">{children}</main>
    </>
  );
}
