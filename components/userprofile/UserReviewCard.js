import React from 'react';
import { Card, Typography, Rate, Space } from 'antd';
import styles from '../../styles/userreview.module.css';
import format from 'date-fns/format';

import { useRouter } from 'next/router';

const { Text, Paragraph } = Typography;

export default function UserReviewCard({ review }) {
  const router = useRouter();

  return (
    <div className={styles.restoRedirectDiv}>
      <Card onClick={() => router.push('/restaurant/' + review.restaurantID)}>
        <Space>
          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              flexDirection: 'column'
              // width: '75px',
            }}>
            <div
              className={styles.imageDiv}
              style={{ backgroundImage: `url(${review.restaurantCoverPhotoURL})` }}></div>
            {/* <HeartOutlined style={{ fontSize: '1.5rem' }} />
              <Text>420 Likes</Text> */}
          </div>

          <div>
            <div>
              <Text strong>{review.restaurantName} &nbsp;&nbsp;</Text>
              <Text type="secondary">{` ${review.edited ? 'Updated on' : 'Posted on'} ${format(
                new Date(review.dateEdited),
                'MMM d, yyyy'
              )}`}</Text>
              <div className={styles.ratingDiv}>
                <Rate disabled value={review.rating} />
              </div>
            </div>
            <br />
            <div>
              {/* <Space> */}
              <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                {review.text}
              </Paragraph>
              {/* </Space> */}
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
}
