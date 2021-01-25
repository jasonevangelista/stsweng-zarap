import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const details = req.body;

  try{
    if(req.method == "POST"){
      await db.review.insertOne({
          author: details.author,
          text: details.text,
          rating: details.rating,
          restaurantID: ObjectId(details.restaurantID),
          upvoters: []
        })
    }
    else if(req.method == "PUT"){
      await db.collection('review').updateOne({ _id: ObjectId() }, 
      {
        $set: {
          text: details.text,
          rating: details.rating,
          upvoters: []
        }
      });
    }
    else if (req.method == "DELETE"){
      await db.collection('review').remove({ _id: ObjectId() });
    }
    
  }
  catch(err){
    console.log(err)
  }
  
};
