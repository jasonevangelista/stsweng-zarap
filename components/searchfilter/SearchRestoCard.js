import styles from '../../styles/searchfilter/SearchRestoCard.module.css'
import {Card, Divider, Rate, Row, Col, Image} from 'antd'

export default function SearchRestoCard({ resto }) {
  return(
    <Card hoverable className={styles.restoCard}>

      <Row>
        <Col span={8} className={styles.imageSection}>
          <div className={styles.cardImage}>
          {/* <Image className={styles.imagePlaceholder} height={150} placeholder={true} src="error"/> */}
          </div>
        </Col>
        <Col span={16} className={styles.restoCardHeader}>
          <h1 id={styles.restoName}>{resto.name}</h1>
          <div id={styles.stars}>
          <Rate disabled allowHalf value={resto.averageRating}/>
          <span className="ant-rate-text">{resto.averageRating} ({resto.reviews.length} reviews)</span>
          </div>
          <p><b>{resto.city}</b></p>
          <p>{resto.fullAddress}</p>
        </Col>
      </Row>

      <Divider className={styles.dividerResto}/>

      <Row>
        <Col span={8} className={styles.detailHeader}>
          <p>CUISINES:</p>
          <p>COST FOR TWO:</p>
          <p>HOURS:</p>
          <p>CONTACT NO:</p>
        </Col>
        <Col span={16}>
          
          <p>Food</p>
          <p>PHP 100</p>
          <p>7:00AM-10:00PM (Mon-Sat)</p>
          <p>0912345</p>
        </Col>
      </Row>
      
    </Card>
  )

}