import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col, Rate, Tag, Divider } from 'antd';
// import { Row, Col, Rate } from 'antd';
import { MdLocationOn } from 'react-icons/md';
import { FaUtensils, FaCoffee, FaHamburger } from 'react-icons/fa';
import Link from 'next/link';

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
            <Link href={'/restaurant/' + card._id}>
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
                >
                <div className={`${styles.cardTitle} ${styles.paddBottom}`}>
                    {card.name}
                </div>

                <Row style={{paddingBottom: '4px'}}>
                  <Tag icon={card.icon}> {card.establishmentType} </Tag>
                  <Tag icon={<MdLocationOn size="12px" />}> {card.city} </Tag>
                </Row>
                  <div id={styles.stars}>
                    <Rate disabled allowHalf value={card.averageRating}/>
                    <span className="ant-rate-text">{FormatRating(card.averageRating, restoSet.reviews)}</span>
                  </div>
                  <div className={styles.featured}>
                    Featured
                  </div>
              </Card> 
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}

{/* <Card className={classes.root}>
  <CardActionArea>
    <CardMedia
      className={classes.media}
      image={card.coverPhotoURL}
      title={card.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {card.name}
      </Typography>
      <Chip
        avatar={card.icon}
        label={card.establishmentType}
        variant="outlined"
        className={styles.MuiChipAvatar}
      />
      <Chip
        avatar={<MdLocationOn size="20px" />}
        label={card.city}
        variant="outlined"
      />
      {/* <Typography variant="body2" color="textSecondary" component="p">
        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    <Button size="small" color="primary">
      Share
    </Button>
    <Button size="small" color="primary">
      Learn More
    </Button>
  </CardActions> 
</Card>  */}