import styles from "../../styles/searchfilter/SearchRestoCard.module.css";
import { Card, Divider, Rate, Row, Col, Image } from "antd";

export default function SearchRestoCard({ resto }) {
  var cuisines = FormatDetails(resto.cuisineType, ", ");
  var contactDetails = FormatDetails(resto.contactDetails, "  |  ");
  var openHours = FormatDetails(resto.openHours, "  |  ");
  var rating = FormatRating(resto.averageRating, resto.reviews);

  return (
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
          <p>CUISINES:</p>
          <p>COST FOR TWO:</p>
          <p>HOURS:</p>
          <p>CONTACT NO:</p>
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

function FormatDetails(details, symbol) {
  var detailsString = "";

  if (details.length > 1) {
    const list = [];
    for (var i = 0; i < details.length; i++) {
      detailsString += details[i];
      if (i + 1 < details.length) detailsString += symbol;
    }
  } else {
    detailsString = details[0];
  }

  return <p>{detailsString}</p>;
}

function FormatRating(rating, reviews) {
  var ratingString = "";
  ratingString = Math.floor(rating * 2) / 2;

  if (reviews.length > 1) {
    return (
      <p>
        {ratingString} ({reviews.length} reviews)
      </p>
    );
  } else {
    return (
      <p>
        {ratingString} ({reviews.length} review)
      </p>
    );
  }
}
