import React, { useState, useEffect } from 'react';
import { Typography, Empty, Input, Button, Rate, Form, Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReviewCard from './ReviewCard';
import { useSession } from 'next-auth/client';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const details = {};

export default function Reviews({ reviews, restaurantID }) {
  const [session, loading] = useSession();
  const [rating, setRating] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [form] = Form.useForm();
  const [userReview, setUserReview] = useState({});
  const [updatedReview, setUpdatedReview] = useState({});

  useEffect(() => {
    if (session) {
      if (reviews.some((review) => review.author === session.user.email)) {
        const review = reviews.find((review) => review.author === session.user.email);
        setShowReview(true);
        setUserReview(review);
        details.reviewID = review._id;
        form.setFieldsValue({ reviewText: review.text });
        setRating(review.rating);
      } else {
        setShowReview(false);
      }
    }
  }, [loading]);

  const postReview = async () => {
    setButtonLoading(true);
    const textString = form.getFieldValue('reviewText');
    if (textString !== null && textString !== '') {
      details.author = session.user.email;
      details.text = textString;
      details.rating = rating;
      details.restaurantID = restaurantID;

      if (details.reviewID === undefined || details.reviewID === null) {
        const data = await postAPI(details);
        if (data) {
          details.reviewID = data.result.insertedId;
          setUpdatedReview(details);
          setShowReview(true);
        }
      } else {
        const data = await updatePostAPI(details);
        if (data) {
          setUpdatedReview(details);
          setShowReview(true);
        }
      }
    }

    setButtonLoading(false);
  };

  const deletePost = async (e) => {
    e.stopPropagation();
    setButtonLoading(true);
    if (updatedReview.reviewID) {
      const deleteDetail = { reviewID: updatedReview.reviewID };
      const status = await deletePostAPI(deleteDetail);
      if (status === 200) {
        setUpdatedReview({});
        setUserReview({});
        details.reviewID = null;
        setShowReview(false);
      }
    } else if (userReview._id) {
      const deleteDetail = { reviewID: userReview._id };
      const status = await deletePostAPI(deleteDetail);
      if (status === 200) {
        setUpdatedReview({});
        setUserReview({});
        details.reviewID = null;
        setShowReview(false);
      }
    }
    setButtonLoading(false);
  };

  return (
    <div>
      <Title level={3}>Reviews</Title>
      {session && <Title level={4}>Your Review</Title>}

      {session &&
        showReview &&
        (reviews.some((review) => review.author === session.user.email) &&
        (updatedReview.reviewID !== null || updatedReview.reviewID !== undefined) ? (
          // <ReviewCard review={reviews.find((review) => review.author === session.user.email)} />
          <>
            <Card
              actions={[
                <EditOutlined
                  onClick={() => {
                    setShowReview(false);
                  }}
                  key="edit"
                />,
                <DeleteOutlined onClick={(e) => deletePost(e)} key="delete" />
              ]}>
              <Rate value={userReview.rating} disabled />
              <br />
              <br />
              <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                {userReview.text}
              </Paragraph>
            </Card>
            <br />
          </>
        ) : (
          <>
            <Card
              actions={[
                <EditOutlined
                  onClick={() => {
                    setShowReview(false);
                  }}
                  key="edit"
                />,
                <DeleteOutlined onClick={(e) => deletePost(e)} key="delete" />
              ]}>
              <Rate value={updatedReview.rating} disabled />
              <br />
              <br />
              <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                {updatedReview.text}
              </Paragraph>
            </Card>
            <br />
          </>
        ))}

      {session && !showReview && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '270px',
            justifyContent: 'space-between'
          }}>
          <div>
            Your rating: &nbsp;
            <Rate defaultValue={rating} onChange={(val) => setRating(val)} />
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
            return <ReviewCard review={review} key={index} session={session} loading={loading} />;
          else if (!session)
            return <ReviewCard review={review} key={index} session={session} loading={loading} />;
        })
      )}
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

async function postAPI(details) {
  const res = await fetch('/api/review/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  });
  return res.json();
}

async function updatePostAPI(details) {
  const res = await fetch('/api/review/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  });
  return res.json();
}

async function deletePostAPI(details) {
  const res = await fetch('/api/review/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  });
  return res.status;
}
