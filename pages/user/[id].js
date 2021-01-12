// import { connectToDatabase } from '../../util/mongodb';
// import { ObjectId } from 'mongodb';
// import { Typography, Divider } from 'antd';
// import Head from 'next/head';
// import Link from 'next/link';

// import styles from '../../styles/restoprofile/userprofile.module.css';

import { useSession } from 'next-auth/client';

export default function UserProfile({userID}) {

  const [session, loading] = useSession();
  console.log("props")
  console.log(userID)

  return (
    <div>
    
    {!loading && !session && ( // trying to access a profile without being logged in
      <div>Access Denied!</div>
    )}
    {!loading && session && session.user.id != userID && ( // trying to access another user's profile
      <>
      <div>You cannot access other user's profiles!</div>
      </>
    )}
    {!loading && session && session.user.id == userID && ( // accesing your own profile
      <>
      <div>ID: {session.user.id}</div>
      <div>Email: {session.user.email}</div>
      <div>First Name: {session.user.firstName}</div>
      <div>Last Name: {session.user.lastName}</div>
      </>
    )}
    </div>
  );
}

function isHex(str) {
  return /^[A-F0-9]+$/i.test(str);
}

export async function getServerSideProps(context) {
  const userID = context.params.id;

  return {
    props: {
      userID: userID
    }
  }
  // // check if params is in valid form (24-character hex string)
  // if (restaurantID.length != 24 || !isHex(restaurantID)) {
  //   return {
  //     redirect: {
  //       destination: '/404',
  //       permanent: false
  //     }
  //   };
  // }

  // const { db } = await connectToDatabase();

  // const restaurant = await db
  //   .collection('restaurant')
  //   .find({ _id: ObjectId(restaurantID) })
  //   .limit(1)
  //   .toArray();

  // if (restaurant.length > 0) {
  //   var results = JSON.parse(JSON.stringify(restaurant));
  //   return {
  //     props: {
  //       resto: results[0]
  //     }
  //   };
  // }

  // // if data is empty
  // else {
  //   return {
  //     redirect: {
  //       destination: '/404',
  //       permanent: false
  //     }
  //   };
  // }

  
}
