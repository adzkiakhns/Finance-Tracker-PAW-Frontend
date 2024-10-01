"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard when this page is accessed
    router.push("/dashboard");
  }, [router]);

  return null; // No need to render anything, since we're redirecting
}
