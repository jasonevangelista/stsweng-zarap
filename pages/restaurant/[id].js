import { connectToDatabase } from '../../util/mongodb';
import { ObjectId } from 'mongodb';
import { Typography, Divider, Rate } from 'antd';
import Head from 'next/head';

import BasicInfo from '../../components/restoprofile/BasicInfo';
import ImageHeader from '../../components/restoprofile/ImageHeader';
import Reviews from '../../components/restoprofile/Reviews';
import Gallery from '../../components/restoprofile/Gallery';

import styles from '../../styles/restoprofile/restaurantprofile.module.css';

const { Title } = Typography;

export default function RestaurantProfile({ resto, reviews }) {
  const rating = FormatRating(resto.averageRating, resto.reviewCount);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{resto.name}</title>
      </Head>

      <div className={styles.contentContainer}>
        <ImageHeader imageURL={resto.coverPhotoURL} />

        <div className={styles.contentBody}>
          <div>
            <Title>{resto.name}</Title>
            <Rate allowHalf value={resto.averageRating} disabled />
             &nbsp;&nbsp;&nbsp;
             <span className="ant-rate-text">{rating}</span>
          </div>
          <Divider />
          <BasicInfo resto={resto} />
          <Divider />
          <Gallery imageArray={resto.menuURLs} />
          <Divider />
          <Reviews reviews={reviews} restaurantID={resto._id} />
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

  // check if params is in valid form (24-character hex string)
  if (restaurantID.length != 24 || !isHex(restaurantID)) {
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
    const restoResult = JSON.parse(JSON.stringify(restaurant));

    const reviews = await db
      .collection('review')
      .find({ restaurantID: ObjectId(restoResult[0]._id) })
      .toArray();

    const reviewsResult = JSON.parse(JSON.stringify(reviews));

    const users = await db.collection('user').find({}).toArray();

    const userList = JSON.parse(JSON.stringify(users));

    // add firstname and lastname of collection 'user' to list of reviews
    const newReviews = reviewsResult.map((review) => {
      const author = userList.find((user) => {
        return user.email === review.author;
      });
      if (author) {
        review.lastName = author.lastName;
        review.firstName = author.firstName;
      }
      return review;
    });
    var resto = restoResult[0];
    // var reviews = await db.collection('review').find({ restaurantID: ObjectId(resto._id) }).project({ rating: 1, _id: 0 }).toArray();
    resto.averageRating = computeAverageScore(reviews)
    resto.reviewCount = reviews.length

    return {
      props: {
        resto: restoResult[0],
        reviews: newReviews
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

function FormatRating(rating, reviewCount) {
  var ratingString = '';
  ratingString = Math.floor(rating * 2) / 2;
  ratingString = ratingString.toFixed(1);

  if (reviewCount > 0) {
    if(reviewCount == 1){
      return (
        <p>
          {ratingString} ({reviewCount} review)
        </p>
      );
    }
    return (
      <p>
        {ratingString} ({reviewCount} reviews)
      </p>
    );
  } else {
    return (
      <p>
        {ratingString} (No reviews)
      </p>
    );
  }
}

function computeAverageScore(reviews){
  var total = 0;
  var average = 0;
  if(reviews.length > 0){
    for(var i = 0; i < reviews.length; i++){
      total += reviews[i].rating;
    }
    average = total / reviews.length;
    return average;
  }
  return 0;
}