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
    if (
      bidAmount &&
      bidValue > item.current_bid &&
      bidValue > item.starting_bid
    ) {
      onPlaceBid(bidValue);
      setBidAmount(""); // Clear input after placing bid
      setErrorMessage("");
    } else {
      setErrorMessage("Bid amount must be greater than the current bid.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white shadow-md rounded-md">
      {new Date(item.end_time) > new Date() ? (
        <>
          {" "}
          <h2 className="text-2xl font-bold mb-4">Place Your Bid</h2>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="number"
              min={item.current_bid || item.starting_bid + 1}
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
        </>
      ) : (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
          <p className="text-xl font-semibold mb-2">Auction Ended</p>
          <p className="text-sm">
            Unfortunately, the auction has already ended. Stay tuned for future
            events!
          </p>
        </div>
      )}

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div>
        <h3 className="text-lg font-semibold mb-2">Other Bidders</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {item.bidders?.reverse().map((bidder, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={bidder.avatar}
                alt={bidder.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <div className="text-center">
                <p className="text-gray-700 text-sm font-semibold mb-2">
                  {bidder.name}
                </p>
                <p className="text-gray-500 text-xs">${bidder.bidAmount}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BidComponent;
