// components/AuctionCardList.js

import React, { useContext } from "react";
import AuctionCard from "./AuctionCard";
import ItemContext from "@/Context/ItemContext";

const AuctionCardList = () => {
  const ctx = useContext(ItemContext);
  return (
    <div className="w-full z-10 ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {ctx.filteredArr
        .slice((ctx.page - 1) * 8, (ctx.page - 1) * 8 + 8)
        .map((auction) => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
    </div>
  );
};

export default AuctionCardList;
