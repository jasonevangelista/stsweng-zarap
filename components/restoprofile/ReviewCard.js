import React, { useState, useEffect } from 'react';
import { Card, Typography, Rate, Space, Button } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from '../../styles/restoprofile/reviewcard.module.css';


const { Text, Paragraph } = Typography;

export default function ReviewCard({ review, session, loading }) {
  const router = useRouter();
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    if(session){
      setUpvoted(review.upvoters.includes(session.user.email));
    }
  }, [session]);

  async function reviewLiked(){
    console.log("button clicked!")
    if(!loading && session){ // user is logged in
      var userEmail = session.user.email

      if(review.author == userEmail){ // user is trying to like his/her own post
        console.log("cannot like your own review!");
      }

      else{ // user is trying to upvote another user's post
        var details = {
          "email": userEmail,
          "reviewID": review._id
        };
        
        if(review.upvoters.includes(userEmail)){ // user has already upvoted the post
          details.upvoted = true;

          var res = await apiUpvote("/api/upvote/", details)
          console.log(res)
          setUpvoted(false);
          router.replace(router.asPath);
        }

        else{ // user has not yet upvoted the post previously
          details.upvoted = false;

          var res = await apiUpvote("/api/upvote/", details)
          console.log(res)
          setUpvoted(true);
          router.replace(router.asPath);
        }
      }
    }
    else{ // user is not logged in
      console.log("you need to login before upvoting!")
    }  
  }

  return (
    <div>
      <Card>
        <div className={styles.container}>
          <div className={styles.detailsContainer}>
            <Text ellipsis strong>{`${review.firstName} ${review.lastName}`}</Text>
            <br />
            <Rate value={review.rating} disabled />
            <br />
            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
              {review.text}
            </Paragraph>
          </div>

          <div
            className={styles.upvoteContainer}
            // style={{
            //   display: 'flex',
            //   textAlign: 'center',
            //   flexDirection: 'column',
            //   justifyContent: 'center',
            //   minWidth: '75px'
            // }}
            >
              
            {!upvoted && 
              <HeartOutlined className={styles.heartIcon}   onClick={()=> {reviewLiked()}} />
            }
            {upvoted && 
              <HeartTwoTone className={styles.heartIcon} twoToneColor="#eb2f96" onClick={()=> {reviewLiked()}} />
            }
          
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
  })
  return res.json();
  
}