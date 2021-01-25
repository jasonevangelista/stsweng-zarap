import React from 'react';
import { Card, Typography, Rate, Space } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

export default function ReviewCard({ review }) {
  return (
    <div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ overflow: 'hidden' }}>
            <Text ellipsis strong>{`${review.firstName} ${review.lastName}`}</Text>
            <br />
            <Rate value={review.rating} disabled />
            <br />
            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
              {review.text}
            </Paragraph>
          </div>

          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              minWidth: '75px'
            }}>
            <HeartOutlined style={{ fontSize: '1.5rem' }} />
            <Text>{review.upvoters && review.upvoters.length + ' likes'}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
