import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dhnu9upvu",
  api_key: "221775181466428",
  api_secret: "rCjkbcffn_6Pd2IPPWdCqeihT0k",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const result = await cloudinary.v2.uploader.upload(req.body, {
      upload_preset: "j23fzylz",
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
