import { connectToDatabase } from '../../../util/mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const {
    query: { account }
  } = req;
  var newAccount = JSON.parse(account);

  // encrypt password
  newAccount.password = bcrypt.hashSync(newAccount.password, 10)

  try{
    await db.collection('user').insertOne(newAccount);
    res.status(200).json({
      message: 'Account successfully registered'
    })
  }
  catch(err){
    res.status(400).json(err)
  }
};