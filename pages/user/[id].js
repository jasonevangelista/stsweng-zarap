import { connectToDatabase } from '../../util/mongodb';
import { ObjectId } from 'mongodb';
import { Button, Divider } from 'antd';
import React, { useState } from 'react';
import EditProfileModal from '../../components/EditProfileModal';
import styles from '../../styles/userprofile.module.css';
import restoProfileStyles from '../../styles/restoprofile/restaurantprofile.module.css';
import UserReviews from '../../components/userprofile/UserReviews';


import Head from 'next/head';


import { useSession } from 'next-auth/client';

export default function UserProfile({user, reviews}) {

  const [session, loading] = useSession();
  const [profileModalVisible, setProfileModalVisible] = useState(false);


  // modal methods
  const showModal = () => {
    setProfileModalVisible(true);
  };

  const closeModal = () => {
    setProfileModalVisible(false);
  };

  return (
    <div className={styles.container}>
    
    {!loading && !session && ( // trying to access a profile without being logged in
      <div className={styles.errorContainer}>
        <h1 className={styles.errorHeader}>Access Denied!</h1>
        <p className={styles.errorMessage}>
          You are not currently logged in.
        </p>
      </div>
      
    )}
    {!loading && session && session.user.id != user._id && ( // trying to access another user's profile
      <div className={styles.errorContainer}>
        <h1 className={styles.errorHeader}>Access Denied!</h1>
        <p className={styles.errorMessage}>
          You cannot access another user&apos;s profile!
        </p>
      </div>
    )}
    {!loading && session && session.user.id == user._id && ( // accesing your own profile
      <>
      <div className={restoProfileStyles.wrapper}>
        <Head>
          <title>My Profile</title>
        </Head>

        <div className={restoProfileStyles.contentContainer}>
          <div className={restoProfileStyles.contentBody}>
            <div>
              <span className={styles.nameSpan}>
                <h1 className={styles.userFullName}>{session.user.firstName} {session.user.lastName}</h1>
              </span>
              <span className={styles.editButtonSpan}>
                <Button size="large" type="primary" className="btnEditProfile"
                onClick={()=>{
                  showModal()
                }}>
                  Edit Profile
                </Button>
              </span>
              <EditProfileModal
                profileModalVisible={profileModalVisible}
                closeModal={closeModal}
                user={user}
              />

              <h4 className={styles.userEmail}>{session.user.email}</h4>
            </div>
            <Divider />
            {/* <Title level={3}>Review History</Title> */}
          
            <UserReviews reviews={reviews} />
            {/* <Tabs style={{ marginTop: "20px" }} defaultActiveKey="1">
              <Tabs.TabPane tab="Basic Information" key="1"></Tabs.TabPane>
              <Tabs.TabPane tab="Reviews" key="2"></Tabs.TabPane>
            </Tabs> */}
          </div>
        </div>
      </div>
      
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

  const { db } = await connectToDatabase();

  // check if params is in valid form (24-character hex string)
  if (userID.length != 24 || !isHex(userID)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }

  const user = await db
    .collection('user')
    .find({ _id: ObjectId(userID) })
    .limit(1)
    .toArray();

  if (user.length > 0) {
    const results = JSON.parse(JSON.stringify(user));
    const userReviews = await getUserReviews(db, results[0]);
    return {
      props: {
        user: results[0],
        reviews: userReviews
      }
    }
  }

  // if data is empty
  else {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }

}

async function getUserReviews(db, user){
  const userReviews = await db
    .collection('review')
    .find({ author: user.email })
    // .sort({date: -1})
    .toArray();
  
  if (userReviews.length > 0){
    const reviewsArr = JSON.parse(JSON.stringify(userReviews));

    for(let i = 0; i < reviewsArr.length; i++){
      // const restaurantName = await getRestaurantNames(db, reviewsArr[i].restaurantID);
      const restaurantDetails = await getRestaurantNames(db, reviewsArr[i].restaurantID);
      reviewsArr[i]["restaurantName"] = restaurantDetails[0]
      reviewsArr[i]["restaurantCoverPhotoURL"] = restaurantDetails[1]



      // reviewsArr[i]["restaurantName"] = restaurantName
    }
    return reviewsArr;
  }
  return [];
}

async function getRestaurantNames(db, restaurantID){
  const restaurant = await db
  .collection('restaurant')
  .find({_id: ObjectId(restaurantID)})
  .limit(1)
  .toArray();
  const name = restaurant[0].name;
  const coverPhotoURL = restaurant[0].coverPhotoURL;

  if(restaurant.length > 0){
    // return JSON.parse(JSON.stringify(restaurant))[0].name;
    return [name, coverPhotoURL]
  }
  return null;
}
