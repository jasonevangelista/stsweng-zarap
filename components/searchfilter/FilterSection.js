import styles from '../../styles/SearchFilter.module.css'
import {Card, Divider, Row, Col} from 'antd'


export default function FilterSection({}) {
  return(
    <Card className={styles.filterSection}>
      
      <p>Filters</p>
      <p>Clear Filter</p>

      <div className={styles.subFilter}>
        <p>Sort by</p>
        <Divider className={styles.dividerFilter}/>
        <p>Rating - high to low</p>
        <p>Cost - high to low</p>
        <p>Cost - low to high</p>
      </div>

      <div className={styles.subFilter}>
        <p>Location</p>
        <Divider className={styles.dividerFilter}/>
        <p>City 1</p>
        <p>City 2</p>
        <p>City 3</p>
        <p>See all locations</p>
      </div>

      <div className={styles.subFilter}>
        <p>Cuisine</p>
        <Divider className={styles.dividerFilter}/>
        <p>Cuisine 1</p>
        <p>Cuisine 2</p>
        <p>Cuisine 3</p>
        <p>See all cuisines</p>
      </div>

    </Card>
  )

}