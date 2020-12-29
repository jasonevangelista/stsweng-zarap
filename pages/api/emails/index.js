import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  
  const { db } = await connectToDatabase();
  var users = await db
    .collection('user')
    .find({})
    .project({email: 1, _id: 0})
    .toArray();
  // console.log(users)
  res.json(users);
};
