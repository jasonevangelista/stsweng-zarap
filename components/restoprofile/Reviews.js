import React, { useState, useEffect } from 'react';
import { Typography, Empty, Input, Button, Rate, Form } from 'antd';
import Card from './ReviewCard';
import { useSession } from 'next-auth/client';

const { Title } = Typography;
const { TextArea } = Input;

export default function Reviews({ reviews, restaurantID }) {
  const [session, loading] = useSession();
  const [rating, setRating] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (session) setShowReview(reviews.some((review) => review.author === session.user.email));
  }, []);

  const postReview = async () => {
    // console.log(form.getFieldValue('reviewText'));
    setButtonLoading(true);
    const textString = form.getFieldValue('reviewText');
    if (textString !== null && textString !== '') {
      const details = {};
      details.author = session.user.email;
      details.text = textString;
      details.rating = rating;
      details.restaurantID = restaurantID;

      console.log(details);

      const data = await fetchAPI(details);
      if (data) {
        setShowReview(true);
      }
      // methods.refreshData();
    }

    setButtonLoading(false);
  };

  return (
    <div>
      <Title level={3}>Reviews</Title>
      {session && <Title level={4}>Your Review</Title>}

      {session &&
        showReview &&
        (reviews.some((review) => review.author === session.user.email) ? (
          <Card review={reviews.find((review) => review.author === session.user.email)} />
        ) : (
          <Card
            review={{
              firstName: session.user.firstName,
              lastName: session.lastName,
              text: form.getFieldValue('reviewText'),
              rating: rating, 
              upvoters: []
            }}
          />
        ))}

      {session && !showReview && (
        // <Empty description="Write a review for this restaurant now!" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '270px',
            justifyContent: 'space-between'
          }}>
          <div>
            Your rating: &nbsp;
            <Rate defaultValue={0} onChange={(val) => setRating(val)} />
          </div>
          <Form form={form}>
            <Form.Item name="reviewText">
              <TextArea
                placeholder="Write a review for this restaurant now!"
                showCount
                maxLength={300}
                autoSize={{ minRows: 5, maxRows: 7 }}
                style={{ resize: 'none' }}
              />
            </Form.Item>
          </Form>

          <Button
            loading={buttonLoading}
            onClick={(e) => postReview()}
            style={{ width: '150px', alignSelf: 'end' }}>
            Post Review
          </Button>
        </div>
      )}

      {session && <Title level={4}>Community Reviews</Title>}

      {reviews.length === 0 ? (
        <Empty description="There are no reviews for this resturant." />
      ) : (
        reviews.map((review, index) => {
          if (session && session.user.email !== review.author)
            return <Card review={review} key={index} session={session} loading={loading} />;
          else if (!session)
            return <Card review={review} key={index} session={session} loading={loading} />;
        })
      )}

      {/* {reviews != null && } */}

      {/* {checkReviews(reviews)} */}
      {/* <Space direction="vertical" style={{ margin: "10px" }}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Space> */}
    </div>
  );
}

export const countReviews = (reviews) => {
  let count = 0;
  reviews.forEach((review) => {
    if (review != null) count++;
  });
  return count + 1;
};

export const checkReviews = (arr) => {
  if (arr.length === 1) {
    if (arr[0] === null) {
      return <Empty description="There are no reviews for this restaurant." />;
    }
  }
};

async function fetchAPI(details) {
  const res = await fetch('/api/review/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  });
  return res.json();
}
