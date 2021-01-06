import { connectToDatabase } from '../../../util/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

export default async (req, res) => {
  const { db } = await connectToDatabase();
  
  const {
    query: { account }
  } = req;

  const accountDetails = JSON.parse(account);

  try {
    const foundAccount = await db.collection('user').findOne({ email: accountDetails['e-mail'] });

    if (foundAccount) {
      const isMatch = bcrypt.compareSync(accountDetails['password'], foundAccount.password);

      if (isMatch) {
        // create jwt payload
        const payload = {
          id: foundAccount._id,
          email: foundAccount.email
        };
        // sign token
        jwt.sign(
          payload,
          KEY,
          {
            expiresIn: 3600
          },
          (err, token) => {
            /* Send success with token */
            res.status(200).json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        /* Send error with message */
        res.status(400).json({ status: 'error', error: 'Password incorrect' });
      }
    } else {
      res.status(400).json({
        message: 'Account not found!'
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }

  return res;
};
