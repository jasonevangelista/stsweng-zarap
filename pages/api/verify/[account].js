import { connectToDatabase } from '../../../util/mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    query: { account }
  } = req;
  const myAccount = JSON.parse(account);

  try {
    const foundAccount = await db.collection('user').findOne({ email: myAccount['e-mail'] });

    if (foundAccount) {
      const isMatch = bcrypt.compareSync(myAccount.password, foundAccount.password);

      if (isMatch) {
        res.status(200).json({ decision: 'success' });
      } else {
        res.status(400).json({ decision: 'error' });
      }
    } else {
      res.status(400).json({ decision: 'error' });
    }
  } catch (err) {
    res.status(400).JSON({ message: err });
  }
};
