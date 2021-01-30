import styles from '../../styles/searchfilter/SearchRestoCard.module.css';
import { Card, Divider, Rate, Row, Col, Image } from 'antd';
import {
  ShopOutlined,
  ClockCircleOutlined,
  MoneyCollectOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';

export default function SearchRestoCard({ resto }) {
  const router = useRouter();
  const cuisines = FormatDetails(resto.cuisineType, ', ');
  const contactDetails = FormatDetails(resto.contactDetails, '  |  ');
  const openHours = FormatDetails(resto.openHours, '  |  ');
  const rating = FormatRating(resto.averageRating, resto.reviewCount);
  const restoProfileLink = '/restaurant/' + resto._id;

  return (
    <Card hoverable className={styles.restoCard} onClick={() => router.push(restoProfileLink)}>
      <Row>
        <Col span={8} className={styles.imageSection}>
          <div
            className={styles.imageDiv}
            style={{ backgroundImage: `url(${resto.coverPhotoURL})` }}>
            {/* <Image
                // className={styles.imagePlaceholder}
                className={styles.cardImage}
                preview={false}
                // width="50%"
                placeholder={true}
                src={resto.coverPhotoURL}
              /> */}
          </div>
        </Col>
        <Col span={16} className={styles.restoCardHeader}>
          <h1 id={styles.restoName}>{resto.name}</h1>
          <div id={styles.stars} className={styles.ratingDiv}>
            <Rate disabled allowHalf value={resto.averageRating} />
            <span className="ant-rate-text">{rating}</span>
          </div>
          <p>
            <b>{resto.city}</b>
          </p>
          <p>{resto.fullAddress}</p>
        </Col>
      </Row>

      <Divider className={styles.dividerResto} />

      <Row>
        <Col span={8} className={styles.detailHeader}>
          <p>
            <ShopOutlined />
            &nbsp;Cuisines
          </p>
          <p>
            <MoneyCollectOutlined />
            &nbsp;Avg. Cost For Two
          </p>
          <p>
            <ClockCircleOutlined />
            &nbsp;Open Hours
          </p>
          <p>
            <PhoneOutlined />
            &nbsp;Contact Details
          </p>
        </Col>
        <Col span={16}>
          {cuisines}
          <p>PHP {resto.averageCost}</p>
          {openHours}
          {contactDetails}
        </Col>
      </Row>
    </Card>
  );
}

export function FormatDetails(details, symbol) {
  let detailsString = '';

  if (details.length > 1) {
    // const list = [];
    for (let i = 0; i < details.length; i++) {
      detailsString += details[i];
      if (i + 1 < details.length) detailsString += symbol;
    }
  } else {
    detailsString = details[0];
  }

  return <p>{detailsString}</p>;
}

function FormatRating(rating, reviewCount) {
  let ratingString = '';
  ratingString = Math.floor(rating * 2) / 2;
  ratingString = ratingString.toFixed(1);

  if (reviewCount > 0) {
    if (reviewCount == 1) {
      return (
        <p>
          {ratingString} ({reviewCount} review)
        </p>
      );
    }
    return (
      <p>
        {ratingString} ({reviewCount} reviews)
      </p>
    );
  } else {
    return <p>{ratingString} (No reviews)</p>;
  }
}
