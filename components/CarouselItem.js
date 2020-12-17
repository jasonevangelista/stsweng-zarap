import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col, Rate } from 'antd';
import { MdLocationOn } from 'react-icons/md';
import { FaUtensils, FaCoffee, FaHamburger } from 'react-icons/fa';
import Link from 'next/link';
// import { Card } from '@material-ui/core';

function FormatRating(rating, reviews){
    var ratingString = "";
    ratingString = Math.floor(rating * 2 ) / 2;
    ratingString = ratingString.toFixed(1);

    if(reviews != null){
        if (reviews.length > 1){
            return (
                <p>{ratingString} ({reviews.length} reviews)</p>
            )
        }
        else{
            return (
                <p>{ratingString} ({reviews.length} review)</p>
            )
        }
    }
    else {
        return (
            <p>{ratingString} (0 review)</p>
        )
    }
}

export default function carouselItem({ restoSet }) {
  //set up icons for the restaurants
  restoSet.map((card, index) => {
    switch (card.establishmentType) {
    case 'Casual Dining':
      card.icon = <FaUtensils size="20px" />;
      break;
    case 'Quick Bite':
      card.icon = <FaHamburger size="20px" />;
      break;
    case 'Café':
      card.icon = <FaCoffee size="20px" />;
      break;
    default:
      card.icon = <FaUtensils size="20px" />;
    }
  });

  return (
    <Row justify="space-around">
      {restoSet.map((card, index) => {
        return (
          <Col span={6} key={index}>
            <Link href={'/restaurant/' + card._id}>
              <Card
                title={card.name}
                bordered={false}
                hoverable
                headStyle={{
                  color: 'white',
                  fontSize: '2vw',
                  fontFamily: 'Permanent Marker',
                  wordWrap: 'break-word !',
                  whiteSpace: 'normal',
                  height: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
                className={styles.card}
                style={
                  card.coverPhotoURL
                    ? {
                      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${card.coverPhotoURL})`,
                    }
                    : {}
                }>
                <Row>
                  <Col>
                    <div style={{ marginTop: '7px' }}>{card.icon}</div>
                  </Col>
                  <Col>
                    <p className={styles.cardContent}>
                      &nbsp;{card.establishmentType}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div style={{ marginTop: '7px' }}>
                      <MdLocationOn size="20px" />
                    </div>
                  </Col>
                  <Col>
                    <p className={styles.cardContent}>&nbsp;{card.city}</p>
                  </Col>
                </Row>
                <div id={styles.stars}>
                                    <Rate disabled allowHalf value={card.averageRating}/>
                                    <span className="ant-rate-text">{FormatRating(card.averageRating, restoSet.reviews)}</span>
                                </div>
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}
