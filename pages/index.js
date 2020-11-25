import Head from "next/head";
import { connectToDatabase } from "../util/mongodb";
import styles from "../styles/landingpage.module.css";
import styled from "styled-components";
import { Input, Row, Col, Carousel, Typography } from "antd";
import CarouselItem from "../components/CarouselItem";

import { useRouter } from 'next/router';

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 10px;
  }
`;

export default function Home({ isConnected }) {
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
              <CarouselItem />
            </div>
            <div>
              <CarouselItem />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected(); // Returns true or false

  return {
    props: { isConnected },
  };
}
