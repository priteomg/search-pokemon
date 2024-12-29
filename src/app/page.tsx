"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Home = dynamic(() => import("../components/Homepage"), { ssr: false });

const Homepage = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default Homepage;
