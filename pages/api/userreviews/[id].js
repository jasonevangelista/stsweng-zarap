import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const { db } = await connectToDatabase();
  var userReviews;

  try{
    userReviews = await db
    .collection('reviews')
    .find({ userID: ObjectId(id) })
    .sort({date: -1})
    .toArray();
  }
  catch(err){
    res.status(400).json(err)
  }
};