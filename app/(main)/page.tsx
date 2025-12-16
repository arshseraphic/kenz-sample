"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home"); // replace avoids back button going to this page
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
