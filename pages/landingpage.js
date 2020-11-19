import styles from '../styles/landingpage.module.css';
import styled from 'styled-components';
import { Input, Row, Col, Carousel, Card  } from 'antd';  

const { Meta } = Card;

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 10px;
  }
`;

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.top_container}>
                <div className={styles.top_bg}></div>
                <h2 className={styles.landing_title}> Find what you like
                    <Row className={styles.search_bar} >
                        <Col span={8}>                
                            <RoundSearch enterButton />
                        </Col>
                    </Row>
                    </h2>
                <Row>
                    <Col span={4} offset={11} className={styles.scroll_container} >  
                        <div className={styles.chevron}></div>
                        <div className={styles.chevron}></div>
                        <div className={styles.chevron}></div>
                        {/* <br></br>
                        <span className={styles.text}>Find Out More</span> */}
                    </Col>
                </Row>
            </div>
            <div className={styles.bottom_container}>
                <div className={styles.bottom_bg}></div>
                <h2 className={styles.landing_bottom_title}> Recommendations </h2>

                <Carousel autoplay className={styles.landing_bottom_card}>
                <Card
                    hoverable
                    style={{ width: 10 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 10 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                </Carousel>
            </div>
        </div>
    )
}
  