import styles from '../../styles/searchfilter/SearchFilter.module.css';
import SearchRestoCard from '../../components/searchfilter/SearchRestoCard';
import FilterSection from '../../components/searchfilter/FilterSection';
import { Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';

import { connectToDatabase } from '../../util/mongodb';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

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
            window.scrollTo(0, 0);
        }
    }, [restaurants]);

    useEffect(() => {
        if (!firstTimeRender.current) {
            searchResults(searchitem, sortOption, filterOption);
            window.scrollTo(0, 0);
        }
    }, [sortOption, filterOption]);

    useEffect(() => {
        if (!firstTimeRender.current) {
            var filter = {
                location: locationFilter,
                cuisine: cuisineFilter
            };
            setFilterOption(filter);
        }
    }, [locationFilter, cuisineFilter]);

    function searchResults(value, sort, filter) {
        getSearchResults(value, sort, filter).then((result) => {
            var restoList = result.data;
            if (restoList.length == 0) {
                setResultStatus('No results found');
            } else {
                setResultStatus('');
            }
            setRestaurants(restoList);
            router.push('/searchfilter/' + value, undefined, {
                shallow: true
            });
        });
    }

    function clearFilters() {
        setSortOption(null);
        setLocationFilter(null);
        setCuisineFilter(null);
    }

    return (
        <div className={styles.pageLayout}>
            <h1>Search Results on &quot;{searchitem}&quot;</h1>

            <Search
                className={styles.searchBar}
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
            results: JSON.parse(JSON.stringify(restaurants))
        }
    };
}

// get restaurants based on search string
async function getSearchResults(searchString, sort, filter) {
    // var filter = 'none' // {"location":"none", "cuisine":"none"}
    if (!sort) {
        sort = 'none';
    }
    console.log('SEARCH STRING: ' + searchString);
    console.log('SORT OPTION: ' + sort);
    console.log('FILTER OPTION: ' + JSON.stringify(filter));
    var queryParams = '?sort=' + sort + '&filter=' + JSON.stringify(filter);

    var searchRoute = 'http://localhost:3000/api/search/' + searchString + queryParams;
    const res = await fetch(searchRoute);
    const data = await res.json();

    if (data) {
        return {
            data
        };
    }
}

// url param format: http://localhost:3000/api/search/SEARCHSTRING?sort=SORT&filter=
