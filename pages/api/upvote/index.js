import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const details = req.body;

  try{
    // before updating, check review upvoters array if email is already there to prevent duplication
    const currentUserUpvotes = await db.collection('review').find(
      { 
        _id: ObjectId(details.reviewID),
        upvoters: {$in: [details.email]}
      }).count();

    console.log("current user upvotes: " + currentUserUpvotes)

    if(details.upvoted){
      if(currentUserUpvotes == 1){
        console.log("removing vote...")
        await db.collection('review').updateOne(
          { _id: ObjectId(details.reviewID) },
          {
            $pull: {upvoters: details.email}
          }
        )
        res.status(200).json({"message": "Review Upvote Removal Successful!"});
      }
      else{
        res.status(400).json({"message": "Trying to remove upvote multiple times quickly!"});
      }
    }
    else{
      if(currentUserUpvotes == 0){
        await db.collection('review').updateOne(
          { _id: ObjectId(details.reviewID) },
          {
            $push: {upvoters: details.email}
          }
        )
        res.status(200).json({"message": "Review Upvote Append Successful!"});
      }
      else{
        res.status(400).json({"message": "Trying to upvote multiple times in a row!"});
      }
      
    }
    
  }
  catch(err){
    console.log(err)
  }
  
};
