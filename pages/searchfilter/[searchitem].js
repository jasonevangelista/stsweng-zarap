import styles from '../../styles/searchfilter/SearchFilter.module.css';
import SearchRestoCard from '../../components/searchfilter/SearchRestoCard';
import FilterSection from '../../components/searchfilter/FilterSection';
import { Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';

import { connectToDatabase } from '../../util/mongodb';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SearchFilter({ results }) {
  const firstTimeRender = useRef(true);
  const router = useRouter();
  const { searchitem } = router.query;

  const [restaurants, setRestaurants] = useState(results);
  const [resultStatus, setResultStatus] = useState(
    getDefaultResultStatus(restaurants)
  );
  const [sortOption, setSortOption] = useState('none');

  const cards = generateRestaurantCards(restaurants);

  useEffect(() => {
    firstTimeRender.current = false;
  }, []);

  useEffect(() => {
    if (!firstTimeRender.current) {
      // console.log("SORT OPTION SET: " + sortOption);
      searchResults(searchitem, sortOption);
    }
  }, [sortOption]);

  function searchResults(value, sort = 'none', filter = 'none') {
    getSearchResults(value, sort, filter).then((result) => {
      var restoList = result.data;
      if (restoList.length == 0) {
        setResultStatus('No results found');
      } else {
        setResultStatus('');
      }
      setRestaurants(restoList);
      router.push('/searchfilter/' + value, undefined, {
        shallow: true,
      });
    });
  }

  function clearFilters() {
    setSortOption('none');
  }

  return (
    <div className={styles.pageLayout}>
      <Head>
        <title>Restaurant Search</title>
      </Head>
      <h1>Search Results on &quot;{searchitem}&quot;</h1>

      <Search
        className={styles.searchBar}
        placeholder="Search Restaurant"
        allowClear
        size="large"
        enterButton={false}
        onSearch={(value) => {
          if (value && value.trim()) {
            searchResults(value);
          }
        }}
      />

      <Row>
        <Col span={6} className={styles.filterLayout}>
          <FilterSection
            setSortOption={setSortOption}
            clearFilters={clearFilters}
            searchItem={searchitem}
          />
        </Col>
        <Col span={18} className={styles.cardsLayout}>
          <h2>{resultStatus}</h2>
          {cards}
        </Col>
      </Row>
    </div>
  );
}

// generate each restaurant card based on results
function generateRestaurantCards(restaurants) {
  var cards = [];
  for (const [index, value] of restaurants.entries()) {
    cards.push(<SearchRestoCard key={index} resto={value}></SearchRestoCard>);
  }
  return cards;
}

// return default result status based on restaurant result length
function getDefaultResultStatus(restaurants) {
  if (restaurants.length == 0) {
    return 'No results found';
  }
  return '';
}

export async function getServerSideProps(context) {
  const searchItem = context.params.searchitem;
  console.log('search item: ' + searchItem);
  const { db } = await connectToDatabase();

  const restaurants = await db
    .collection('restaurant')
    .find({ name: { $regex: searchItem, $options: 'i' } })
    .toArray();

  return {
    props: {
      results: JSON.parse(JSON.stringify(restaurants)),
    },
  };
}

// get restaurants based on search string
async function getSearchResults(searchString, sort = 'none', filter = 'none') {
  // var filter = 'none' // {"location":"none", "cuisine":"none"}
  console.log('SEARCH STRING: ' + searchString);
  console.log('SORT OPTION: ' + sort);
  var queryParams = '?sort=' + sort + '&filter=' + filter;
  var searchRoute =
    'http://localhost:3000/api/search/' + searchString + queryParams;
  const res = await fetch(searchRoute);
  const data = await res.json();

  if (data) {
    return {
      data,
    };
  }
}

// url param format: http://localhost:3000/api/search/SEARCHSTRING?sort=SORT&filter=
