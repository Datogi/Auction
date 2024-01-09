// BookCard.js

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import React from "react";

const AuctionCard = ({ auction }) => {
  const formattedEndTime = formatDistanceToNow(new Date(auction.end_time), {
    addSuffix: true,
  });

  return (
    <Link href={`item/${auction._id}`}>
      <div className="z-30 relative h-[400px] rounded overflow-hidden shadow-lg bg-white">
        <div className="aspect-w-16 aspect-h-9 pb-2 border-b-2 overflow-hidden group-hover:opacity-75">
          <img
            src={auction.image}
            alt={auction.title}
            className="w-full h-56 object-contain hover:scale-90"
          />
        </div>

        <div className="p-2">
          <div className="font-bold text-lg mb-1">{auction.title}</div>
          <p className="text-gray-700 text-sm mb-2">{auction.description}</p>
          <p className="text-gray-700 text-sm">
            Current Bid: ${auction.current_bid}
          </p>
        </div>

        <div className="absolute left-2 bottom-4">
          <span className="inline-block bg-gray-200 rounded-full my-1 px-2 py-1 text-xs font-semibold text-gray-700 mr-1">
            End Time: {formattedEndTime}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
            Reserve Price: ${auction.reserve_price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
