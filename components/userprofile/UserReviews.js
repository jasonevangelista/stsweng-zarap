import React, { useState } from 'react';
import { Empty, Space, Pagination } from 'antd';
import Card from './UserReviewCard';
import styles from '../../styles/userreview.module.css';

export default function UserReviews({ reviews }) {
  const [cardSetIndex, setCardSetIndex] = useState(0);
  const pageSize = 4;
  const reviewCards = generateUserReviewCards(reviews, pageSize);
  return (
    <div>
      <h1>Review History</h1>
      {hasReviews(reviews) && (
        <div>
          {reviewCards[cardSetIndex]}
          <Space direction="vertical" style={{ margin: '10px' }}></Space>
          <div className={styles.paginationDiv}>
            <Pagination
              className={styles.userReviewPagination}
              onChange={(page) => {
                setCardSetIndex(page - 1);
              }}
              defaultCurrent={1}
              pageSize={pageSize}
              total={reviews.length}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} reviews`}
            />
          </div>
        </div>
      )}

      {!hasReviews(reviews) && (
        <Empty description="You currently do not have reviews for any restaurant." />
      )}
    </div>
  );
}

const generateUserReviewCards = (reviews, pageSize) => {
  let cards = [];
  let groupedCards = [];
  for (const [index, value] of reviews.entries()) {
    cards.push(<Card key={index} review={value}></Card>);
  }
  while (cards.length) groupedCards.push(cards.splice(0, pageSize));
  return groupedCards;
};

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
  if (arr) {
    if (arr.length > 0) {
      return true;
    }
  }
  return false;
};
