import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import styles from '../styles/landingpage.module.css';
import styled from 'styled-components';
import { Input, Row, Col, Typography } from 'antd';
import CarouselItem from '../components/CarouselItem';
import { useState, useEffect } from 'react';
import { ObjectId } from 'mongodb';

const { Title } = Typography;

import { useRouter } from 'next/router';

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 10px;
  }
`;

const WhiteTitle = styled(Title)`
  &.ant-typography {
    color: white;
  }
`;

//Code from de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const restoPicker = (results) => {
  const shuffledArray = shuffle(results);

  const restaurants = [];
  let tracker = 0;

  while (restaurants.length < 7) {
    // if (shuffledArray[tracker].averageRating && shuffledArray[tracker].averageRating >= 3.0) {
    restaurants.push(shuffledArray[tracker]);
    // }

    tracker++;
  }
  return restaurants;
};

export default function Home({ results }) {
  const router = useRouter();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(restoPicker(results));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Zarap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topContainer}>
        <div className={styles.topBG}>
          <div className={styles.landingTitle}>
            {' '}
            <WhiteTitle style={{ color: 'white', fontSize: '64px' }}>Find what you like</WhiteTitle>
            {/* {profile && <h1>LOGGED IN</h1>}
            {profile && 
            <Button onClick={e => handleOnClickLogout(e)}>LOG OUT</Button>}
            {!profile && <h1>NOT LOGGED IN</h1>} */}
            <Row className={styles.searchBar} type="flex">
              <Col span={12} height="100%">
                <RoundSearch
                  size="large"
                  id="searchbar"
                  className={['searchBar', 'landingSearchBar']}
                  placeholder="Search for restaurants"
                  enterButton
                  onSearch={(value) => {
                    if (value && value.trim()) {
                      console.log(value);
                      const encodedValue = encodeURIComponent(value)
                      router.push('searchfilter/' + encodedValue);
                    }
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div className={styles.bottomBG}>
        <div className={styles.carouselTop}>
          <div>
            <CarouselItem restoSet={cards.slice(0, 3)} />
          </div>
        </div>
      </div>
    </div>
  );
}

// get all restaurants info when page is loaded
export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const restaurants = await db.collection('restaurant').find({}).toArray();

  for (let i = 0; i < restaurants.length; i++) {
    const currentResto = restaurants[i];
    const reviews = await db
      .collection('review')
      .find({ restaurantID: ObjectId(currentResto._id) })
      .project({ rating: 1, _id: 0 })
      .toArray();
    restaurants[i].averageRating = computeAverageScore(reviews);
    restaurants[i].reviewCount = reviews.length;
  }

  return {
    props: {
      results: JSON.parse(JSON.stringify(restaurants))
    }
  };
}

function computeAverageScore(reviews) {
  let total = 0;
  let average = 0;
  if (reviews.length > 0) {
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }
    average = total / reviews.length;
    return average;
  }
  return 0;
}
