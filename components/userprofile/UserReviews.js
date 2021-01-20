import React from 'react';
import { Typography, Empty, Space } from 'antd';
import Card from "./UserReviewCard";

const { Title } = Typography;

export default function UserReviews({ reviews }) {
  const reviewCards = generateUserReviewCards(reviews);

  return (
    <div>
      <h1>Review History</h1>
      {hasReviews(reviews) && (
        <div>
          {reviewCards}
          {/* <Card />
          <Card />
          <Card />
          <Card />
          <Card /> */}
          <Space direction="vertical" style={{ margin: "10px" }}>
          </Space>
        </div>
      )}

      {!hasReviews(reviews) && (
        <Empty description="You currently do not have reviews for any restaurant." />
      )}

    </div>
  )
}

const generateUserReviewCards = (reviews) => {
  var cards = [];
  for (const [index, value] of reviews.entries()) {
    cards.push(<Card key={index} review={value}></Card>);
  }
  return cards;
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
      return <Empty description="You do not have reviews for any restaurant." />;
    }
  }
};

export const hasReviews = (arr) => {
  if (arr.length === 1) {
    if (arr[0] === null) {
      // return <Empty description="You do not have reviews for any restaurant." />;
      return false;
    }
    return true;
  }
  return false;
};
