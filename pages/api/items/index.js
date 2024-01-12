import Items from "@/models/item";
import connectMongo from "@/utils/connectMongo";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addItem(req, res) {
  try {
    await connectMongo();
    if (req.method === "GET") {
      const items = await Items.find();
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

        seller,
        bidders,
        end_time,
      } = req.body;
      console.log(
        _id,
        title,
        description,
        image,
        starting_bid,
        current_bid,

        seller,
        bidders,
        end_time
      );

      const newItem = await Items.create({
        _id,
        title,
        description,
        image,
        starting_bid,
        current_bid,

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
