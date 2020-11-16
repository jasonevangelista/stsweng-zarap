import styles from '../styles/searchfilter/SearchFilter.module.css'
import SearchRestoCard from '../components/searchfilter/SearchRestoCard'
import FilterSection from '../components/searchfilter/FilterSection'
import {Row, Col} from 'antd'
import Search from 'antd/lib/input/Search'

export default function SearchFilter({ results }) {
  const sampleResto = {
    "name": "Ichiraku Ramen",
    "city": "Konoha",
    "averageRating": 5,
    "reviews": [["review1"], ["review2"], ["review3"]],
    "fullAddress": "678 T.M. Kalaw Avenue, Ermita, Manila",
    "Cuisines": ["cuisine1", "cuisine2", "cuisine3"],
  }

  return (

    <div className={styles.pageLayout}>

      <h1>Restaurants in Konoha</h1>

      <Search 
        className={styles.searchBar} 
        placeholder="Search Restaurant" 
        allowClear 
        enterButton="Search"
        size="large"
        enterButton={false}
      />

      <Row>
        <Col span={6} className={styles.filterLayout}>
          <FilterSection></FilterSection>
        </Col>

        <Col span={18} className={styles.cardsLayout}>
            <SearchRestoCard resto={sampleResto}></SearchRestoCard>
            <SearchRestoCard resto={sampleResto}></SearchRestoCard>
            <SearchRestoCard resto={sampleResto}></SearchRestoCard>
        </Col>
        
      </Row>
      
    </div>
  )
}