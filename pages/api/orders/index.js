import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      await Order.deleteMany({});
      res.status(200).json({ message: "All orders have been cleared." });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // Add the following code to send a response for other methods
  if (method !== "GET" && method !== "POST" && method !== "DELETE") {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};


export default handler;
