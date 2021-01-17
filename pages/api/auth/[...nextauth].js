import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../util/mongodb';
import bcrypt from 'bcryptjs';

const options = {
  providers: [
    Providers.Credentials({
      authorize: async (accountDetails) => {
        const user = async ({ email, password }) => {
          const { db } = await connectToDatabase();

          const foundAccount = await db.collection('user').findOne({ email: email });

          if (foundAccount) {
            const isMatch = bcrypt.compareSync(password, foundAccount.password);

            const profile = {
              id: foundAccount._id,
              email: foundAccount.email,
              firstName: foundAccount.firstName,
              lastName: foundAccount.lastName
            };

            if (isMatch) {
              return profile;
            } else {
              return null;
            }
          } else {
            return null;
          }
        };

        const profile = await user(accountDetails);
        if (profile) {
          return Promise.resolve(profile);
        } else {
          return Promise.reject(null);
        }
      }
    })
  ],

  secret: process.env.SECRET_KEY,

  session: {
    maxAge: 3600
  },

  jwt: {
    secret: process.env.SECRET_KEY
  },

  debug: true
};

export default (req, res) => NextAuth(req, res, options);
