import Home from "@/components/Homepage";
import React, { Suspense } from "react";

const Homepage = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default Homepage;
