import React from 'react';
import { Card, Typography, Rate, message } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useSession } from 'next-auth/client';
import styles from '../../styles/restoprofile/reviewcard.module.css';
import format from 'date-fns/format';

const { Text, Paragraph } = Typography;

export default function ReviewCard({ review, setUpvoters }) {
  const [session, loading] = useSession();

  const reviewLiked = async () => {
    if (!loading && session) {
      // user is logged in
      const userEmail = session.user.email;

      if (review.author !== userEmail) {
        // user is trying to upvote another user's post
        const details = {
          email: userEmail,
          reviewID: review._id
        };

        if (review.upvoters.includes(userEmail)) {
          // user has already upvoted the post
          details.upvoted = true;

          const res = await apiUpvote('/api/upvote/', details);
          if (res.status === 200) {
            setUpvoters(review, 'disliked');
          }
        } else {
          // user has not yet upvoted the post previously
          details.upvoted = false;

          const res = await apiUpvote('/api/upvote/', details);
          if (res.status === 200) {
            setUpvoters(review, 'liked');
          }
        }
      }
    } else {
      // user is not logged in
      message.error('You need to log in before upvoting!');
    }
  };

  return (
    <div>
      <Card loading={loading}>
        <div className={styles.container}>
          <div className={styles.detailsContainer}>
            <Text ellipsis strong>{`${review.firstName} ${review.lastName}`}</Text>
            <Text type="secondary">{` ${review.edited ? 'Updated on' : 'Posted on'} ${format(
              new Date(review.dateEdited),
              'MMM d, yyyy'
            )}`}</Text>
            <br />
            <Rate value={review.rating} disabled />
            <br />
            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
              {review.text}
            </Paragraph>
          </div>

          <div className={styles.upvoteContainer}>
            {!session ||
              (session && !review.upvoters.includes(session.user.email) && (
                <HeartOutlined
                  className={styles.heartIcon}
                  onClick={() => {
                    reviewLiked();
                  }}
                />
              ))}
            {session && review.upvoters.includes(session.user.email) && (
              <HeartTwoTone
                className={styles.heartIcon}
                twoToneColor="#eb2f96"
                onClick={() => {
                  reviewLiked();
                }}
              />
            )}

            <Text>{review.upvoters.length + ' likes'}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
}

async function apiUpvote(url, details) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  });
  return res;
}
