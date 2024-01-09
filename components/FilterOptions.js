// components/FilterOptions.js

import React from "react";

const FilterOptions = ({
  filter,
  setFilter,
  minBid,
  setMinBid,
  maxBid,
  setMaxBid,

  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="my-4 flex flex-col md:flex-row">
      <label className="mr-2 mb-2 md:mb-0 font-semibold">Filter:</label>
      <select
        className="p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-4 flex-1"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="hasBidders">Has Bidders</option>
      </select>

      <div className="flex flex-col md:flex-row">
        <input
          className="p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2 flex-1"
          type="number"
          value={minBid}
          onChange={(e) => setMinBid(e.target.value)}
          placeholder="Min Bid"
        />

        <input
          className="p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2 flex-1"
          type="number"
          value={maxBid}
          onChange={(e) => setMaxBid(e.target.value)}
          placeholder="Max Bid"
        />
      </div>

      <input
        className="p-2 border border-gray-300 rounded mb-2 md:mb-0 flex-1"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default FilterOptions;
