import styles from '../styles/SearchFilter.module.css'
import SearchRestoCard from '../components/searchfilter/SearchRestoCard'
import FilterSection from '../components/searchfilter/FilterSection'
import {Row, Col} from 'antd'

export default function SearchFilter({ results }) {
  return (

    <div className={styles.pageLayout}>

      <p>Restaurants in CITY-NAME</p>
      
      <Row>
        <Col span={6} className={styles.filterLayout}>
          <FilterSection></FilterSection>
        </Col>

        <Col span={18} className={styles.cardsLayout}>
          <SearchRestoCard></SearchRestoCard>
          <SearchRestoCard></SearchRestoCard>
          <SearchRestoCard></SearchRestoCard>
          <SearchRestoCard></SearchRestoCard>
        </Col>

      </Row>
      
    </div>
    

  )
}