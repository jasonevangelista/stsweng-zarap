import React from "react";
import { Typography, Empty } from "antd";

const { Title } = Typography;

export default function ReviewTab({ reviews }) {
  const checkReviews = (arr) => {
    if (arr.length === 1) {
      if (arr[0] === null) {
        return <Empty description="There are no reviews for this resturant."/>;
      }
    }
  };

  return (
    <div>
      <Title level={3}>Reviews</Title>
      {checkReviews(reviews)}
    </div>
  );
}
