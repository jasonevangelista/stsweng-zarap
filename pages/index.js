import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import styles from '../styles/landingpage.module.css';
import styled from 'styled-components';
import { Input, Row, Col, Carousel, Typography, Button } from 'antd';
import CarouselItem from '../components/CarouselItem';
import { useState, useEffect } from 'react';

const { Title } = Typography;

/* middleware */
import {
  // absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout
} from '../lib/utils';

const Search = Input;
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
  var currentIndex = array.length,
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
    if (shuffledArray[tracker].averageRating >= 3.0) {
      restaurants.push(shuffledArray[tracker]);
    }

    tracker++;
  }
  return restaurants;
};

export default function Home({ results, profile}) {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(restoPicker(results));
  }, []);

  // const { profile } = results;

  console.log("profile")
  console.log(profile)

  function handleOnClickLogout(e) {
    setLogout(e);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Zarap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topContainer}>
        <div className={styles.topBG}>
          <h2 className={styles.landingTitle}>
            {' '}
            <WhiteTitle style={{fontSize:'5vw'}}>Find what you like</WhiteTitle>
            {profile && <h1>LOGGED IN</h1>}
            {profile && 
            <Button onClick={e => handleOnClickLogout(e)}>LOG OUT</Button>}
            {!profile && <h1>NOT LOGGED IN</h1>}
            <Row className={styles.searchBar} type="flex">
              <Col span={12} height="100%">
                <RoundSearch size="large"
                  className={["searchBar", "landingSearchBar"]}
                  placeholder="Search for restaurants"
                  enterButton
                  onSearch={(value) => {
                    if (value && value.trim()) {
                      console.log(value);
                      router.push('searchfilter/' + value);
                    }
                  }}
                />
              </Col>
            </Row>
          </h2>
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
export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const restaurants = await db.collection('restaurant').find({}).toArray();

  const { req } = context;
  // const { origin } = absoluteUrl(req);

  // const baseApiUrl = `${origin}/api`;
  console.log("header get serversidep rops")

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';
  console.log("profile")
  console.log(profile)

  return {
    props: {
      results: JSON.parse(JSON.stringify(restaurants)),
      profile
    },
  };
}
