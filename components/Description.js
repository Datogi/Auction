// components/ItemDescription.js
import React, { useState, useEffect } from "react";

const ItemDescription = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const endTime = new Date(item.end_time).getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white shadow-md rounded-md transition-all duration-300">
      <div className="mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
        <p className="text-gray-600 mb-6">{item.description}</p>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <p className="text-gray-800 font-semibold">
              Current Bid: ${item.current_bid}
            </p>
            <span className="text-gray-500">•</span>
            <p className="text-gray-600">Seller: {item.seller.name}</p>
          </div>
          <p className="text-gray-700 font-bold m-3 animate-flash">
            Ends in
            <span className="m-1 ">{timeLeft.days}d</span>
            <span className="m-1">{timeLeft.hours}h</span>
            <span className="m-1">{timeLeft.minutes}m</span>
            <span className="m-1">{timeLeft.seconds}s</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDescription;
