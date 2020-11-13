import styles from '../styles/searchfilter/SearchFilter.module.css'
import SearchRestoCard from '../components/searchfilter/SearchRestoCard'
import FilterSection from '../components/searchfilter/FilterSection'
import {Row, Col, Space} from 'antd'

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

      <p>Restaurants in CITY-NAME</p>
      
      <Row>
        <Col span={6} className={styles.filterLayout}>
          <FilterSection></FilterSection>
        </Col>

        <Col span={18} className={styles.cardsLayout}>
          <Space direction="vertical" className={styles.cardSpace} size="large">
            <SearchRestoCard resto={sampleResto}></SearchRestoCard>
            <SearchRestoCard resto={sampleResto}></SearchRestoCard>
            <SearchRestoCard resto={sampleResto}></SearchRestoCard>
          </Space>
        </Col>
        

      </Row>
      
    </div>
    

  )
}