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

  callbacks:{
    jwt: async (token, user, account, profile, isNewUser) => {
      // set user object from custom user in Provider to token user object
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
    session: async(session, user) =>{
      // overwrite session user to custom user set in token
      session.user = user.user;
      return Promise.resolve(session);
    },
  },

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
