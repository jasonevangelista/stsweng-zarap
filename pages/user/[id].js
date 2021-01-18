import { connectToDatabase } from '../../util/mongodb';
import { ObjectId } from 'mongodb';
import { Button, Divider, Typography } from 'antd';
import React, { useState } from 'react';
import EditProfileModal from '../../components/EditProfileModal';
import styles from '../../styles/userprofile.module.css';
import restoProfileStyles from '../../styles/restoprofile/restaurantprofile.module.css';
import Reviews from '../../components/userprofile/UserReviews';


import Head from 'next/head';
const { Title } = Typography;


import { useSession } from 'next-auth/client';

export default function UserProfile({user}) {

  const [session, loading] = useSession();
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  console.log("props")
  console.log(user._id)

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
      <div>Access Denied!</div>
    )}
    {!loading && session && session.user.id != user._id && ( // trying to access another user's profile
      <>
      <div>You cannot access other user's profiles!</div>
      </>
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
                  console.log("edit profile!")
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
          
            <Reviews reviews={[1]} />
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

    console.log(user)

  if (user.length > 0) {
    var results = JSON.parse(JSON.stringify(user));
    return {
      props: {
        // userID: userID,
        user: results[0]
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
