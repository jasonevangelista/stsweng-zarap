import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col, Rate } from 'antd';
import { MdLocationOn } from 'react-icons/Md';  
import { FaHamburger, FaUtensils, FaCoffee } from 'react-icons/Fa';  

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
    console.log("------------------------------------GOT IN THE COMPONENT-----------------------------");
    console.log(restoSet.length);
    restoSet.map((resto) => {
        console.log("------------One restaurant------------");
        console.log(resto.name + " " + resto.establishmentType);
        switch (resto.establishmentType) {
            case "Quick Bite"    : {console.log("QUICK"); resto.icon = <FaHamburger size='20px'/>; break;}
            case "Café"          : {console.log("COFFEE"); resto.icon = <FaCoffee size='20px'/>; break;}
            case "Casual Dining" : {console.log("CASUAL"); resto.icon = <FaUtensils size='20px'/>; break;}
            default              : {console.log("DEFF"); resto.icon = <FaUtensils size='20px'/>; break;}
        }
        console.log(resto.icon);
        console.log("------------End restaurant------------");
        console.log("");
    });
    console.log("-----------CARD  TIME------------");
    return (  
        <Row justify="space-around">
            {restoSet.map ((card, index) => {
                console.log("-----------CARD  One------------");
                console.log(card.name);
                console.log(card.establishmentType);
                console.log(card.icon);
                console.log("-----------CARD  DONE------------");
                console.log("");
                return (
                    <Col span={6} key={index}>
                        <Card title={card.name} bordered={false} hoverable headStyle={{color: 'white', fontSize: '2vw', fontFamily: 'Permanent Marker',  wordWrap: 'break-word !', whiteSpace: 'normal', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} className={styles.card}>
                            
                            <Row>
                                <Col>
                                    <div style={{marginTop: '7px'}}>
                                        {card.icon}
                                    </div>
                                </Col>
                                <Col>
                                    <p className={styles.cardContent}>&nbsp;{card.establishmentType}</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div style={{marginTop: '7px'}}>
                                        <MdLocationOn size='20px'/>
                                    </div>
                                </Col>
                                <Col>
                                    <p className={styles.cardContent}>&nbsp;{card.city}</p>
                                </Col>
                            </Row>

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