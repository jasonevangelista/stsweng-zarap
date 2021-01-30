import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col, Rate, Tag, Badge } from 'antd';
import { MdLocationOn } from 'react-icons/md';
import { FaUtensils, FaCoffee, FaHamburger } from 'react-icons/fa';
import { useRouter } from 'next/router';

function FormatRating(rating, reviewCount) {
  var ratingString = '';
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

export default function carouselItem({ restoSet }) {
  const router = useRouter();

  //set up icons for the restaurants
  restoSet.map((card, index) => {
    switch (card.establishmentType) {
      case 'Casual Dining':
        card.icon = <FaUtensils size="12px" />;
        break;
      case 'Quick Bite':
        card.icon = <FaHamburger size="12px" />;
        break;
      case 'Café':
        card.icon = <FaCoffee size="12px" />;
        break;
      default:
        card.icon = <FaUtensils size="12px" />;
    }
  });

  return (
    <Row justify="space-around" type="flex">
      {restoSet.map((card, index) => {
        return (
          <Col span={6} key={index} height="100%">
            <Badge.Ribbon text="Featured" color="rgb(199, 66, 66)">
              <Card
                title={' '}
                bordered={false}
                hoverable
                headStyle={{
                  height: '20vh',
                  backgroundImage: `url(${card.coverPhotoURL})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px'
                }}
                className={styles.card}
                onClick={()=>router.push('/restaurant/' + card._id)}>
                <div className={`${styles.cardTitle} ${styles.paddBottom}`}>{card.name}</div>

                <Row style={{ paddingBottom: '4px' }}>
                  <Tag icon={card.icon}> {card.establishmentType} </Tag>
                  <Tag icon={<MdLocationOn size="12px" />}> {card.city} </Tag>
                </Row>
                <div id={styles.stars} className={styles.ratingDiv}>
                  <Rate disabled allowHalf value={card.averageRating} />
                  <span className="ant-rate-text">
                    {FormatRating(card.averageRating, card.reviewCount)}
                  </span>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        );
      })}
    </Row>
  );
}
