// pages/api/editItem.js
import Items from "@/models/item";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "PUT") {
      const { _id, bidders, current_bid } = await req.body;

      const updatedItem = await Items.findByIdAndUpdate(
        _id,
        { bidders, current_bid },
        { new: true } // Return the updated document
      );

      res.status(200).json({
        status: "success",
        data: {
          updatedItem,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}
