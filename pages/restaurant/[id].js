import { connectToDatabase } from '../../util/mongodb';
import { ObjectId } from 'mongodb';
import { Typography, Rate, Divider, Button } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

import BasicInfo from '../../components/restoprofile/BasicInfo';
import ImageHeader from '../../components/restoprofile/ImageHeader';
import Reviews from '../../components/restoprofile/Reviews';
import Gallery from '../../components/restoprofile/Gallery';

import styles from '../../styles/restoprofile/restaurantprofile.module.css';

const { Title } = Typography;

export default function RestaurantProfile({ resto }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{resto.name}</title>
      </Head>

      <div className={styles.buttonBox}>
        <Button type="link"><Link href={`/searchfilter/${resto.name}`}>Back to Search</Link></Button>
      </div>

      <div className={styles.contentContainer}>
        <ImageHeader imageURL={resto.coverPhotoURL} />

        <div className={styles.contentBody}>
          <div>
            <Title>{resto.name}</Title>
            {/* <Rate allowHalf value={resto.averageRating} disabled />
             &nbsp;&nbsp;&nbsp;
             {resto.averageRating} */}
          </div>
          <Divider />
          <BasicInfo resto={resto} />
          <Divider />
          <Gallery imageArray={resto.menuURLs} />
          <Divider />
          <Reviews reviews={resto.reviews} />
          {/* <Tabs style={{ marginTop: "20px" }} defaultActiveKey="1">
            <Tabs.TabPane tab="Basic Information" key="1"></Tabs.TabPane>
            <Tabs.TabPane tab="Reviews" key="2"></Tabs.TabPane>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
}

function isHex(str) {
  return /^[A-F0-9]+$/i.test(str);
}

export async function getServerSideProps(context) {
  const restaurantID = context.params.id;
  console.log('restaurant id: ' + restaurantID);

  // check if params is in valid form (24-character hex string)
  if (restaurantID.length != 24 || !isHex(restaurantID)) {
    console.log('invalid params!!!');
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }

  const { db } = await connectToDatabase();

  const restaurant = await db
    .collection('restaurant')
    .find({ _id: ObjectId(restaurantID) })
    .limit(1)
    .toArray();

  if (restaurant.length > 0) {
    var results = JSON.parse(JSON.stringify(restaurant));
    console.log('resto:');
    console.log(results[0]);
    return {
      props: {
        resto: results[0]
      }
    };
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
