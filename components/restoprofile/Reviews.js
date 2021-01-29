import React, { useState, useEffect } from 'react';
import { Typography, Empty, Input, Button, Rate, Form, Card, Tabs, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReviewCard from './ReviewCard';
import { useSession } from 'next-auth/client';
import format from 'date-fns/format';
import styles from '../../styles/restoprofile/reviews.module.css';
import cardstyles from '../../styles/restoprofile/reviewcard.module.css';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;
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

  const postReview = async (e) => {
    e.stopPropagation();
    setButtonLoading(true);
    const textString = form.getFieldValue('reviewText');
    if (textString !== null && textString !== '' && /\S/.test(textString) && rating > 0) {
      details.author = session.user.email;
      details.text = textString;
      details.rating = rating;
      details.restaurantID = restaurantID;

      if (details.reviewID === undefined || details.reviewID === null) {
        const res = await postAPI(details);
        const data = await res.json();
        if (res.status === 200 && data) {
          message.success('Review added!');
          details.reviewID = data.result.insertedId;
          setUpdatedReview(details);
          setShowReview(true);
        } else {
          message.error('Server error, please try again later.');
        }
      } else {
        const res = await updatePostAPI(details);
        const data = await res.json();
        if (res.status === 200 && data) {
          message.success('Review edited!');
          setUpdatedReview(details);
          setShowReview(true);
        } else {
          message.error('Server error, please try again later.');
        }
      }
    } else if (rating === 0) {
      message.error('Rating cannot be zero!');
    } else {
      message.error('Review cannot be blank!');
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
        message.success('Review deleted!');
        resetFields();
        setShowReview(false);
      } else {
        message.error('Server error, please try again later.');
      }
    } else if (userReview._id) {
      const deleteDetail = { reviewID: userReview._id };
      const status = await deletePostAPI(deleteDetail);
      if (status === 200) {
        message.success('Review deleted!');
        resetFields();
        setShowReview(false);
      } else {
        message.error('Server error, please try again later.');
      }
    }
    setButtonLoading(false);
  };

  const resetFields = () => {
    setUpdatedReview({});
    setUserReview({});
    details.reviewID = null;
    form.setFieldsValue({ reviewText: '' });
    setRating(0);
  };

  const sortByPopular = (array) => {
    return array
      .sort((a, b) =>
        a.upvoters.length < b.upvoters.length ? 1 : a.dateEdited < b.dateEdited ? 1 : 0
      )
      .filter((review) => {
        if ((session && session.user.email !== review.author) || !session) return true;
        else return false;
      })
      .map((review, index) => {
        return <ReviewCard review={review} key={index} session={session} loading={loading} />;
      });
  };

  const sortByRecent = (array) => {
    return array
      .sort((a, b) => (a.dateEdited < b.dateEdited ? 1 : 0))
      .filter((review) => {
        if ((session && session.user.email !== review.author) || !session) return true;
        else return false;
      })
      .map((review, index) => {
        return <ReviewCard review={review} key={index} session={session} loading={loading} />;
      });
  };

  const getUpdatedReview = (attribute) => {
    return updatedReview.reviewID === null || updatedReview.reviewID === undefined
      ? userReview[attribute]
      : updatedReview[attribute];
  };

  return (
    <div>
      <Title level={3}>Reviews</Title>
      {session && <Title level={4}>Your Review</Title>}

      {session && showReview && (updatedReview.reviewID || userReview._id) && (
        <>
          <Card>
            <div className={cardstyles.container}>
              <div className={cardstyles.detailsContainer}>
                <Rate value={`${getUpdatedReview('rating')}`} disabled />
                <br />
                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                  {`${getUpdatedReview('text')}`}
                </Paragraph>
                <Text style={{ fontSize: '10px' }}>{` ${
                  getUpdatedReview('edited') ? 'Updated on' : 'Posted on'
                } ${format(new Date(), 'MMM d, yyyy')}`}</Text>
              </div>
              <div className={cardstyles.upvoteContainer}>
                <div className={cardstyles.buttonContainer}>
                  <EditOutlined onClick={() => setShowReview(false)} style={{ fontSize: '20px' }} />
                </div>
                <div className={cardstyles.buttonContainer}>
                  <DeleteOutlined onClick={(e) => deletePost(e)} style={{ fontSize: '20px' }} />
                </div>
              </div>
            </div>
          </Card>
          <br />
        </>
      )}

      {session && !showReview && (
        <div
          className={styles.myReview}
          // style={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   height: '270px',
          //   justifyContent: 'space-between'
          // }}
        >
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
            onClick={(e) => postReview(e)}
            // style={{ width: '150px', alignSelf: 'end' }}
            className={styles.btnPost}>
            Post Review
          </Button>
        </div>
      )}

      {session && <Title level={4}>Community Reviews</Title>}

      {reviews.filter((review) => {
        if ((session && session.user.email !== review.author) || !session) return true;
        else return false;
      }).length === 0 ? (
        <Empty description="There are no reviews for this resturant." />
      ) : (
        <Tabs type="card">
          <TabPane tab="Popular" key="1">
            {sortByPopular(reviews)}
          </TabPane>
          <TabPane tab="Recent" key="2">
            {sortByRecent(reviews)}
          </TabPane>
        </Tabs>
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

  return res;
}

async function updatePostAPI(details) {
  const res = await fetch('/api/review/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  });
  return res;
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
