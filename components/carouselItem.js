import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col } from 'antd';  

export default function carouselItem() {
    return (  
        <Row>
            <Col span={6} offset={1}>
                <Card title="Konohotdogs" bordered={false} hoverable headStyle={{color: 'rgba(255,255,255, 255)', fontSize: '2vw', fontFamily: 'Permanent Marker', border: 0 }} className={styles.card}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col span={6} offset={2}>
                <Card title="Konosiopao" bordered={false} hoverable headStyle={{color: 'rgba(255,255,255, 255)', fontSize: '2vw', fontFamily: 'Permanent Marker', border: 0 }} className={styles.card}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col span={6} offset={2}>
                <Card title="Konosiomai" bordered={false} hoverable headStyle={{color: 'rgba(255,255,255, 255)', fontSize: '2vw', fontFamily: 'Permanent Marker', border: 0 }} className={styles.card}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
        </Row>
    )
}