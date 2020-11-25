import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col, Rate } from 'antd';  

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
    
    return (  
        <Row justify="space-around">
            {restoSet.map ((card, index) => {
                return (
                <Col span={6} key={index}>
                    <Card title={card.name} bordered={false} hoverable headStyle={{color: 'white', fontSize: '2vw', fontFamily: 'Permanent Marker', border: 0, wordWrap: 'break-word !', whiteSpace: 'normal', height: '150px'}} className={styles.card}>
                        <p className={styles.cardContent}>{card.establishmentType}</p>
                        <p className={styles.cardContent}>{card.city}</p>
                        {/* <p className={styles.cardContent}>{card.averageRating}</p> */}
                        <div id={styles.stars}>
                            <Rate disabled allowHalf value={card.averageRating}/>
                            <span className="ant-rate-text">{FormatRating(card.averageRating, restoSet.reviews)}</span>
                        </div>
                    </Card>
                </Col>
                )
            })}
        </Row>
    )
}