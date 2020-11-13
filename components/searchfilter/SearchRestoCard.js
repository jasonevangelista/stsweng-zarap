import styles from '../../styles/SearchFilter.module.css'
import {Card, Divider, Rate, Row, Col, Image} from 'antd'

export default function SearchRestoCard({ resto }) {
  return(
    <Card hoverable className={styles.restoCard}>

      <Row>
        <Col span={8}>
          <div className={styles.cardImageSection}>
          </div>
          {/* <Image className={styles.cardImage} width={150} height={100} src="error"/> */}
        </Col>
        <Col span={16} className={styles.restoCardHeader}>
          <p>Restaurant Name</p>
          <Rate disabled allowHalf value={3}/><span className="ant-rate-text">3 (100 reviews)</span>
          <p><b>City</b></p>
          <p>AddressAddressAddressAddressAddressAddressAddressAddress</p>
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