import React from 'react';
import { Card, Typography, Rate, Space } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import styles from '../../styles/userreview.module.css';

import Link from 'next/link';

const { Text, Paragraph } = Typography;

export default function UserReviewCard({review}) {
  return (
    <div className={styles.restoRedirectDiv}>
      <Link href={"/restaurant/" + review.restaurantID}>
        <Card>
          <Space>
            <div
              style={{
                display: 'flex',
                textAlign: 'center',
                flexDirection: 'column',
                // width: '75px',
              }}>
                <div className={styles.imageDiv}
                style={{backgroundImage: `url(${review.restaurantCoverPhotoURL})`}}
                >
                </div>
              {/* <HeartOutlined style={{ fontSize: '1.5rem' }} />
              <Text>420 Likes</Text> */}
            </div>

            <div>
              <div>
                <Text strong>{review.restaurantName} &nbsp;&nbsp;</Text><br/>
                <div className={styles.ratingDiv}>
                  <Rate disabled value={review.rating} />
                </div>
              </div>
              <br />
              <div>
                <Space>
                  <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                    {review.text}
                  </Paragraph>
                </Space>
              </div>
            </div>

            
          </Space>
        
        </Card>
      </Link>
    </div>
  );
}
