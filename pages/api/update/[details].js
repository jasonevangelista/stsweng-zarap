import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const {
    query: { details }
  } = req;
  const updatedDetails = JSON.parse(details);

  if(updatedDetails["newPassword"]){
    updatedDetails.newPassword = bcrypt.hashSync(updatedDetails.newPassword, 10)
  }

  try{
    if(updatedDetails["newPassword"]){
      console.log("password, first and last name updated")
      await db.collection('user').updateOne(
        { _id: ObjectId(updatedDetails._id) },
        {
          $set: {
            firstName: updatedDetails.firstName,
            lastName: updatedDetails.lastName,
            password: updatedDetails.newPassword
          }
        }
      )
    }
    else{
      console.log("only first and last name updated")
      await db.collection('user').updateOne(
        { _id: ObjectId(updatedDetails._id) },
        {
          $set: {
            firstName: updatedDetails.firstName,
            lastName: updatedDetails.lastName
          }
        }
      )
    }
    res.status(200).json({
      message: 'Account details successfully updated'
    })
  }
  catch(err){
    res.status(400).json(err)
  }
};