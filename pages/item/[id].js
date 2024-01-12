// components/DetailsScreen.js
import { useContext, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import ItemContext from "@/Context/ItemContext";
import BidComponent from "@/components/BidComponent";
import ItemDescription from "@/components/Description";
import Loader from "@/components/Loader";
import socket from "@/components/socket";

function DetailsScreen() {
  const ctx = useContext(ItemContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (ctx.items.length === 0) {
      getItems();
    } else {
      setItem(
        ctx.items.find((el) => el._id === window.location.href.split("/")[4])
      );
      setLoading(false);
    }
  }, [ctx.items]);

  const getItems = async () => {
    try {
      const res = await fetch("/api/items").then((res) => res.json());

      ctx.setItems(res.items);
      ctx.setFilteredArr(res.items);
      setItem(
        res.items.find((el) => el._id === window.location.href.split("/")[4])
      );
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const editItems = async (newItem) => {
    try {
      const res = await fetch(`/api/items/${newItem._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        console.log("Item updated successfully:", newItem);
        // Update the local state only if the server update is successful
        setItem(newItem);
      } else {
        throw new Error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  function placeBid(bid) {
    if (session) {
      const newItem = {
        ...item,
        current_bid: bid,
        bidders: [
          {
            id: session.accessToken,
            avatar: session.user.image,
            name: session.user.name,
            bidAmount: bid,
          },
          ...item.bidders,
        ],
      };

      socket.emit("placeBid", newItem);

      editItems(newItem);
      // Update the local state immediately (optimistic update)
      setItem(newItem);
    } else {
      signIn(); // Redirect to sign-in page if the user is not authenticated
    }
  }
  useEffect(() => {
    socket.on("updateBids", (newBidObject) => {
      setItem(newBidObject);
    });
  }, []);

  return (
    <div className="z-50 flex justify-center">
      {loading || !item ? (
        <Loader />
      ) : (
        <div className="flex">
          <ItemDescription item={item} />
          <BidComponent item={item} onPlaceBid={placeBid} />
        </div>
      )}
    </div>
  );
}

export default DetailsScreen;
