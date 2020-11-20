import styles from '../styles/carouselItem.module.css';
import { Card, Row, Col } from 'antd';  

export default function carouselItem() {
    return (  
        <Row>
            <Col span={6} offset={1}>
                <Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col span={6} offset={2}>
                <Card title="Card title #2" bordered={false} hoverable className={styles.card}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col span={6} offset={2}>
                <Card title="Card title #3" bordered={false} hoverable className={styles.card}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
        </Row>
    )
}