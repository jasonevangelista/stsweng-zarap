import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const details = req.body;

  /* 
  == Expected req.body ==

  POST REQUEST:
  - author (email)
  - text
  - rating
  - restaurantID

  PUT REQUEST:
  - reviewID
  - text
  - rating

  DELETE REQUEST:
  - reviewID
  
  */

  try{
    if(req.method == "POST"){
      console.log("creating post request...")
      if(details.author && details.text && details.rating && details.restaurantID){
        await db.collection('review').insertOne({
          author: details.author,
          text: details.text,
          rating: details.rating,
          restaurantID: ObjectId(details.restaurantID),
          upvoters: [],
          edited: false,
          dateCreated: new Date(),
          dateEdited: new Date()
        })
        res.status(200).json({"message": "POST Request successful"})
      }
      else{
        res.status(400).json({"message": "POST Request failed! Some values are undefined"})
      }
      
    }
    else if(req.method == "PUT"){
      if(details.text && details.rating && details.reviewID){
        await db.collection('review').updateOne({ _id: ObjectId(details.reviewID) }, 
        {
          $set: {
            text: details.text,
            rating: details.rating,
            upvoters: [],
            edited: true,
            dateEdited: new Date()
          }
        });
        res.status(200).json({"message": "PUT Request successful"})
      }
      else{
        res.status(400).json({"message": "PUT Request failed! Some values are undefined"})
      }

    }
    else if (req.method == "DELETE"){
      if(details.reviewID){
        await db.collection('review').deleteOne({ _id: ObjectId(details.reviewID) });
        res.status(200).json({"message": "DELETE Request successful"})
      }
      else{
        res.status(400).json({"message": "PUT Request failed! reviewID is undefined"})
      }
      
    }
    else{
      res.status(400).json({"message": "Invalid Request method! Only POST, PUT, and DELETE are allowed!"})
    }
    
  }
  catch(err){
    console.log(err)
    res.status(400).json({"error": err})
  }
  
};
