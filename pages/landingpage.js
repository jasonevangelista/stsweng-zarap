import Background from '../public/bezier_curve.svg';
import styles from '../styles/landingpage.module.css';
import { Input, Row, Col } from 'antd';

const { Search } = Input;

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.top_container}>
                <div className={styles.top_bg}></div>
                <h2 className={styles.landing_title}> Find what you like </h2>
                <Row className={styles.search_bar} >
                    <Col span={8}>                
                        <Input enterButton />
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={10} className={styles.scroll_container} >  
                        <div className={styles.chevron}></div>
                        <div className={styles.chevron}></div>
                        <div className={styles.chevron}></div>
                        {/* <a class="text" href="https://naegele.it">See it in action</a> */}
                        <br></br>
                        <span className={styles.text}>Find Out More</span>
                    </Col>
                </Row>
            </div>
            <div className={styles.bottom_container}>
                <div className={styles.bottom_bg}></div>
                <h2 className={styles.landing_title}> Recommendations </h2>
            </div>
        </div>
    )
}
  