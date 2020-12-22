import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import styles from '../styles/landingpage.module.css';
import styled from 'styled-components';
import { Input, Row, Col, Carousel, Typography } from 'antd';
import CarouselItem from '../components/CarouselItem';
import { useState, useEffect } from 'react';

const { Title } = Typography;
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
          <h2 className={styles.landingTitle}>
            {' '}
              <WhiteTitle style={{fontSize:'5vw'}}>Find what you like</WhiteTitle>
            <Row className={styles.searchBar} type="flex">
              <Col span={12} height="100%">
                <RoundSearch size="large"
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
        {/* <h2 className={styles.landingBottomTitle}> Recommendations </h2> */}
        {/* <div className={styles.landingBottomTitle}>  <Title> Recommendations </Title>
        </div> */}
        <div className={styles.carouselTop}>
          {/* <Carousel autoplay  className={styles.bigHeight}> */}
            <div>
              <CarouselItem restoSet={cards.slice(0, 3)} />
            </div>
            {/* <div>
              <CarouselItem restoSet={cards.slice(3, 6)} />
            </div>
          </Carousel>  */}
        </div>
      </div>
    </div>
  );
}

// get all restaurants info when page is loaded
export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const restaurants = await db.collection('restaurant').find({}).toArray();

  return {
    props: {
      results: JSON.parse(JSON.stringify(restaurants)),
    },
  };
}
