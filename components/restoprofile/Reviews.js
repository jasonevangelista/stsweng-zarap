import React from "react";
import { Typography, Empty, Space } from "antd";
import Card from "./ReviewCard";

const { Title } = Typography;

// const countReviews = (reviews) => {
//   let count = 0;
//   reviews.forEach((review) => {
//     if (review != null) count++;
//   });
//   return count + 1;
// };

export default function Reviews({ reviews }) {
  const checkReviews = (arr) => {
    if (arr.length === 1) {
      if (arr[0] === null) {
        return <Empty description="There are no reviews for this resturant." />;
      }
    }
  };

  return (
    <div>
      <Title level={3}>Reviews</Title>
      {/* {checkReviews(reviews)} */}
      <Space direction="vertical" style={{ margin: "10px" }}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Space>
    </div>
  );
}
