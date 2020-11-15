import Background from '../public/bezier_curve.svg';
import styles from '../styles/landingpage.module.css';
import { Input, Row, Col } from 'antd';

const { Search } = Input;

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.top_container}>
                <div className={styles.top_bg}></div>
                {/* <Search placeholder="input search text" onSearch={onSearch} enterButton /> */}
                <h2 className={styles.landing_title}> Find what you like </h2>
                {/* <h2 className={styles.search_bar}> Find what you like </h2> */}
                <Row className={styles.search_bar} >
                    <Col span={24}>                
                        <Search placeholder="input search text" enterButton />
                    </Col>
                </Row>
            </div>
            <div className={styles.bottom_container}>
                <div className={styles.bottom_bg}></div>
            </div>
        </div>
    )
}
  