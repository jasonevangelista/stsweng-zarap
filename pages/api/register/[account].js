import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  const {
    query: { account }
  } = req;
  var newAccount = JSON.parse(account);

  const { db } = await connectToDatabase();

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