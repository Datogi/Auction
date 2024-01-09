// components/BidSection.js
import ItemContext from "@/Context/ItemContext";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";

const BidComponent = ({ onPlaceBid, item }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();

  const ctx = useContext(ItemContext);

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
    setErrorMessage("");
  };

  const handlePlaceBid = () => {
    const bidValue = parseFloat(bidAmount);
    if (!session) {
      setErrorMessage("Please Log in to place a bid");

      return;
    }
    if (bidAmount && bidValue > item.current_bid) {
      onPlaceBid(bidValue);
      setBidAmount(""); // Clear input after placing bid
      setErrorMessage("");
    } else {
      setErrorMessage("Bid amount must be greater than the current bid.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Place Your Bid</h2>
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="number"
          min={item.current_bid + 1}
          value={bidAmount}
          onChange={handleBidChange}
          placeholder="Enter your bid"
          className="border border-gray-300 p-2 w-1/2"
        />
        <button
          onClick={handlePlaceBid}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Place Bid
        </button>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div>
        <h3 className="text-lg font-semibold mb-2">Other Bidders</h3>
        <ul className="flex space-x-4">
          {item.bidders?.reverse().map((bidder, index) => (
            <li key={index} className="flex flex-col items-center">
              <img
                src={bidder.avatar}
                alt={bidder.name}
                className="w-12 h-12 rounded-full mb-2"
              />
              <p className="text-gray-700">{bidder.name}</p>
              <p className="text-gray-500">${bidder.bidAmount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BidComponent;
