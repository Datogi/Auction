import Items from "@/models/item";
import connectMongo from "@/utils/connectMongo";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addBook(req, res) {
  try {
    await connectMongo();
    console.log(Items);
    if (req.method === "GET") {
      const items = await Items.find({});
      res.status(200).json({ items: items });
    }

    if (req.method === "POST") {
      const {
        _id,
        title,
        description,
        image,
        starting_bid,
        current_bid,
        reserve_price,
        seller,
        bidders,
        end_time,
      } = req.body;

      const newItem = await Items.create({
        _id,
        title,
        description,
        image,
        starting_bid,
        current_bid,
        reserve_price,
        seller,
        bidders,
        end_time,
      });

      res.status(201).json({
        status: "success",
        message: "Data was created",
        book: newItem,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
