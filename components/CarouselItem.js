import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col, Rate } from 'antd';
// import { Row, Col, Rate } from 'antd';
import { MdLocationOn } from 'react-icons/md';
import { FaUtensils, FaCoffee, FaHamburger } from 'react-icons/fa';
import Link from 'next/link';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
// import Chip from '@material-ui/core/Chip';

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

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

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

  // const classes = useStyles();

  return (
    <Row justify="space-around">
      {restoSet.map((card, index) => {
        return (
          <Col span={6} key={index}>
            <Link href={'/restaurant/' + card._id}>
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
              <Card
                title={' '}
                bordered={false}
                hoverable
                headStyle={{
                  height: '150px',
                  backgroundImage: `url(${card.coverPhotoURL})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                className={styles.card}
                >
                <div className={styles.cardTitle}>
                  {card.name}
                </div>

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
