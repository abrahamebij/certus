"use client";
import dynamic from "next/dynamic";

const MarketClient = dynamic(() => import("./MarketClient"), {
  ssr: false,
});

function Markets() {
  return <MarketClient />;
}

export default Markets;
