import React from 'react';
import { Typography, Empty, Space } from 'antd';
import Card from './ReviewCard';
import { useSession } from 'next-auth/client';

const { Title } = Typography;

export default function Reviews({ reviews }) {
  const [session, loading] = useSession();

  return (
    <div>
      <Title level={3}>Reviews</Title>
      {reviews.length === 0 ? (
        <Empty description="There are no reviews for this resturant." />
      ) : (
        reviews.map((review, index) => {
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
