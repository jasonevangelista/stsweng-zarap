import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  const {
    query: { id }
  } = req;

  const { db } = await connectToDatabase();
  const reviews = await db.collection('review').find({ restaurantID: id }).toArray();
  
  res.json(reviews);
};
