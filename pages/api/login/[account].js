import { connectToDatabase } from '../../../util/mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const {
    query: { account }
  } = req;

  const accountDetails = JSON.parse(account);

  try {
    const foundAccount = await db.collection('user').findOne({ email: accountDetails['e-mail'] });
    if (foundAccount) {
      const match = bcrypt.compare(accountDetails['password'], foundAccount.password);
      console.log('match' + match);
      res.status(200).json({
        message: 'Account found!'
      });
    } else {
      res.status(400).json({
        message: 'Account not found!'
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
