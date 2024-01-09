import { useContext, useEffect, useState } from "react";
import ItemContext from "@/Context/ItemContext";
import FilterOptions from "@/components/FilterOptions";
import AuctionCardList from "@/components/AuctionCardList";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

export default function Home() {
  const ctx = useContext(ItemContext);
  const [loading, isLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [minBid, setMinBid] = useState("");
  const [maxBid, setMaxBid] = useState("");
  const [suitType, setSuitType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const newFilteredArr = ctx.items.filter((auction) => {
      const bidFilter =
        filter === "all" ||
        (filter === "active" && new Date(auction.end_time) > new Date()) ||
        (filter === "completed" && new Date(auction.end_time) <= new Date());
      const minBidFilter =
        minBid === "" || auction.current_bid >= parseInt(minBid, 10);
      const maxBidFilter =
        maxBid === "" || auction.current_bid <= parseInt(maxBid, 10);
      const suitTypeFilter =
        suitType === "" ||
        auction.suitType.toLowerCase().includes(suitType.toLowerCase());
      const hasBiddersFilter =
        filter === "hasBidders" ? auction.bidders.length > 0 : true;
      const searchTermFilter =
        searchTerm === "" ||
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.description.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        bidFilter &&
        minBidFilter &&
        maxBidFilter &&
        suitTypeFilter &&
        hasBiddersFilter &&
        searchTermFilter
      );
    });
    ctx.setFilteredArr(newFilteredArr);
  }, [filter, minBid, maxBid, suitType, searchTerm]);

  const getItems = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/items").then((res) =>
        res.json()
      );
      console.log(res.items);
      ctx.setItems(res.items);
      ctx.setFilteredArr(res.items);
      isLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ctx.items.length <= 0 ? getItems() : isLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center ">
          <FilterOptions
            filter={filter}
            setFilter={setFilter}
            minBid={minBid}
            setMinBid={setMinBid}
            maxBid={maxBid}
            setMaxBid={setMaxBid}
            suitType={suitType}
            setSuitType={setSuitType}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <AuctionCardList />
          <Pagination />
        </div>
      )}
    </>
  );
}
