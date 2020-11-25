import styles from "../../styles/searchfilter/SearchFilter.module.css";
import SearchRestoCard from "../../components/searchfilter/SearchRestoCard";
// import FilterSection from "../../components/searchfilter/FilterSection";
import { Row, Col } from "antd";
import Search from "antd/lib/input/Search";

import { connectToDatabase } from "../../util/mongodb";

import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchFilter({ results }) {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState(results);

  // generate each restaurant card based on results
  const cards = [];
  for (const [index, value] of restaurants.entries()) {
    cards.push(<SearchRestoCard key={index} resto={value}></SearchRestoCard>);
  }

  return (
    <div className={styles.pageLayout}>
      <h1>Search Results</h1>

      <Search
        className={styles.searchBar}
        placeholder="Search Restaurant"
        allowClear
        size="large"
        enterButton={false}
        onSearch={(value) => {
          if (value && value.trim()) {
            router.push("searchfilter/" + value);
          }
        }}
      />

      {/* <Row>
        <Col span={6} className={styles.filterLayout}>
          <FilterSection></FilterSection>
        </Col>

        <Col span={18} className={styles.cardsLayout}>
          {cards}
        </Col>
      </Row> */}
      <Row>
        <Col span={24} className={styles.cardsLayout}>
          {cards}
        </Col>
      </Row>
    </div>
  );
}

// get all restaurants info when page is loaded
export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const restaurants = await db.collection("restaurant").find({}).toArray();

  return {
    props: {
      results: JSON.parse(JSON.stringify(restaurants)),
    },
  };
}
