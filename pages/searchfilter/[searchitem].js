import styles from '../../styles/searchfilter/SearchFilter.module.css';
import SearchRestoCard from '../../components/searchfilter/SearchRestoCard';
import FilterSection from '../../components/searchfilter/FilterSection';
import { Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';

import { connectToDatabase } from '../../util/mongodb';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const errorMessage = (

  <div className={styles.errorContainer}>
    <h2>No restaurants were found</h2>
    <div className={styles.searchTipContainer}>
      <h3>Suggestion: Check the spelling of your keyword</h3>
    </div>
  </div>
);

export default function SearchFilter({ results }) {
  const firstTimeRender = useRef(true);

  const router = useRouter();
  const { searchitem } = router.query;

  const [restaurants, setRestaurants] = useState(results);
  const [resultStatus, setResultStatus] = useState(getDefaultResultStatus(restaurants));

  const [sortOption, setSortOption] = useState(null);
  const [filterOption, setFilterOption] = useState({ location: null, cuisine: null });
  const [locationFilter, setLocationFilter] = useState(null);
  const [cuisineFilter, setCuisineFilter] = useState(null);

  const cards = generateRestaurantCards(restaurants);

  useEffect(() => {
    firstTimeRender.current = false;
  }, []);

  useEffect(() => {
    if (!firstTimeRender.current) {
      // window.scrollTo(0, 0);
      setSortOption(null);
    }
  }, [searchitem]);

  useEffect(() => {
    if (!firstTimeRender.current) {
        searchResults(searchitem, sortOption, filterOption);
    }
  }, [filterOption]);

  useEffect(() => {
    if (!firstTimeRender.current) {
      searchResults(searchitem, sortOption, filterOption);
    }
  }, [sortOption]);

  useEffect(() => {
    if (!firstTimeRender.current) {
      const filter = {
        location: locationFilter,
        cuisine: cuisineFilter
      };
      setFilterOption(filter);
    }
  }, [locationFilter, cuisineFilter]);

  function searchResults(value, sort, filter) {
    getSearchResults(value, sort, filter).then((result) => {
      const restoList = result.data;
      if (restoList.length == 0) {
        setResultStatus(errorMessage);
      } else {
        setResultStatus('');
      }
      setRestaurants(restoList);
      var encodedValue = encodeURIComponent(value)
      // router.push('/searchfilter/' + value, undefined, {
      router.push('/searchfilter/' + encodedValue, undefined, {
        shallow: true
      });
    });
  }

  function clearFilters() {
    setLocationFilter(null);
    setCuisineFilter(null);
  }

  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageHeader}>
        <Head>
          <title>Restaurant Search</title>
        </Head>
        <h1>Search Results on &quot;{searchitem}&quot;</h1>
      </div>
      <Search
        id="searchbar"
        className={[styles.searchBar, "searchBar"]}
        placeholder="Search Restaurant"
        allowClear
        size="large"
        enterButton={false}
        onSearch={(value) => {
          if (value && value.trim()) {
            searchResults(value, null, { location: null, cuisine: null });
          }
        }}
      />

      <Row>
        <Col span={6} className={styles.filterLayout}>
          <FilterSection
            setSortOption={setSortOption}
            setLocationFilter={setLocationFilter}
            setCuisineFilter={setCuisineFilter}
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
  const cards = [];
  for (const [index, value] of restaurants.entries()) {
    cards.push(<SearchRestoCard key={index} resto={value}></SearchRestoCard>);
  }
  return cards;
}

// return default result status based on restaurant result length
function getDefaultResultStatus(restaurants) {
  if (restaurants.length == 0) {
    return errorMessage;
  }
  return null;
}

export async function getServerSideProps(context) {
  const searchItem = context.params.searchitem;
  const { db } = await connectToDatabase();
  const escapedItem = searchItem.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&");
  const restaurants = await db
    .collection('restaurant')
    .find({ name: { $regex: escapedItem, $options: 'i' } })
    .toArray();
  return {
    props: {
      results: JSON.parse(JSON.stringify(restaurants)),
    },
  };
}

// get restaurants based on search string
async function getSearchResults(searchString, sort, filter) {
  // const filter = 'none' // {"location":"none", "cuisine":"none"}
  if (!sort) {
    sort = 'none';
  }
  searchString = encodeURIComponent(searchString);

  const queryParams = '?sort=' + sort + '&filter=' + JSON.stringify(filter);

  const searchRoute = '/api/search/' + searchString + queryParams;
  const res = await fetch(searchRoute);
  const data = await res.json();

  if (data) {
    return {
      data
    };
  }
}


// url param format: http://localhost:3000/api/search/SEARCHSTRING?sort=SORT&filter=
