import styles from '../../styles/searchfilter/SearchFilter.module.css'
import SearchRestoCard from '../../components/searchfilter/SearchRestoCard'
import FilterSection from '../../components/searchfilter/FilterSection'
import {Row, Col} from 'antd'
import Search from 'antd/lib/input/Search'

import { connectToDatabase } from '../../util/mongodb'

// import {useState} from 'react'

// import {useRouter} from 'next/router'


export default function SearchFilter({ results }) {
  // const router = useRouter();
  // const [restaurants, setRestaurants] = useState(results);
  // const [resultStatus, setResultStatus] = useState('');

  // generate each restaurant card based on results
  const cards = []
  // for (const [index, value] of restaurants.entries()){
  //   cards.push(<SearchRestoCard key={index} resto={value}></SearchRestoCard>)
  // }

  for (const [index, value] of results.entries()){
    cards.push(<SearchRestoCard key={index} resto={value}></SearchRestoCard>)
  }

  return (

    <div className={styles.pageLayout}>

    <h1>Search Results</h1>

      <Search 
        className={styles.searchBar} 
        placeholder="Search Restaurant" 
        allowClear 
        enterButton="Search"
        size="large"
        enterButton={false}
        // onSearch={(value) => {
        //   if(value || value.trim()){
        //     getSearchResults(value).then((result) => {
        //       var restoList = result.data

        //       if(restoList.length == 0){
        //         setResultStatus('No results found')
        //       }
        //       else{
        //         setResultStatus('')
        //       }

        //       console.log('restolist:')
        //       console.log(restoList)
        //       setRestaurants(restoList)
        //       router.push('/searchfilter/' + value, undefined, {shallow: true})
              
        //     })
        //   }
          
        // }}
      />

      <Row>
        <Col span={6} className={styles.filterLayout}>
          <FilterSection></FilterSection>
        </Col>

        <Col span={18} className={styles.cardsLayout}>
          {/* <h2>{resultStatus}</h2> */}
          { cards }
          
        </Col>
        
      </Row>
      
    </div>
  )
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


// async function getSearchResults(searchString){
//   var searchRoute = 'http://localhost:3000/api/search/' + searchString
//   const res = await fetch(searchRoute)
//   const data = await res.json()

//   if(data){
//     return {
//       data
//     }
//   }
// }