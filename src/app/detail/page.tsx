"use client";

import Detail from "@/components/Detail";
import { Suspense } from "react";

function DetailPage() {
  return (
    <Suspense>
      <Detail />
    </Suspense>
  );
}

export default DetailPage;
