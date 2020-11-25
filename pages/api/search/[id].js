import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  console.log(id);

  const { db } = await connectToDatabase();

  const restaurants = await db
    .collection("restaurant")
    .find({ name: { $regex: id, $options: "i" } })
    .toArray();

  res.json(restaurants);
};
