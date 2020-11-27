import Head from "next/head";
import { connectToDatabase } from "../util/mongodb";
import styles from "../styles/landingpage.module.css";
import styled from "styled-components";
import { Input, Row, Col, Carousel } from "antd";
import CarouselItem from "../components/CarouselItem";

const Search = Input;
import { useRouter } from 'next/router';

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 10px;
  }
`;

//Code from de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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

  const restaurants = []
  let tracker = 0;

  while (restaurants.length < 7) {
    if (shuffledArray[tracker].averageRating >= 3.0) {
      restaurants.push(shuffledArray[tracker]);
    }
    
    tracker++;
  }
  return restaurants;
}

export default function Home({ results }) {
  let cards = restoPicker(results); 
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Zarap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topContainer}>
        <div className={styles.topBG}>
          <h2 className={styles.landingTitle}>
            {" "}
            Find what you like
            <Row className={styles.searchBar}>
              <Col span={8}>
                <RoundSearch enterButton 
                  onSearch={(value) => {
                    if(value && value.trim()){
                      console.log(value)
                      router.push('searchfilter/' + value)
                    }
                  }}/>
              </Col>
            </Row>
          </h2>
          <Row>
            <Col span={4} offset={11} className={styles.scrollContainer}>
              <div className={styles.chevron}></div>
              <div className={styles.chevron}></div>
              <div className={styles.chevron}></div>
              {/* <br></br>
                <span className={styles.text}>Find Out More</span> */}
            </Col>
          </Row>
        </div>
      </div>

      <div className={styles.bottomBG}>
        <h2 className={styles.landingBottomTitle}> Recommendations </h2>
        <div className={styles.carouselTop}>
          <Carousel autoplay dots={false}>
            <div>
              <CarouselItem restoSet={cards.slice(0,3)}/>
            </div>
            <div>
              <CarouselItem restoSet={cards.slice(3,6)}/>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

// get all restaurants info when page is loaded
export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const restaurants = await db
    .collection("restaurant")
    .find({ })
    .toArray();

  return {
    props: {
      results: JSON.parse(JSON.stringify(restaurants)),
    },
  };
}
