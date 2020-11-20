import styles from '../styles/landingpage.module.css';
import styled from 'styled-components';
import { Input, Row, Col, Carousel, Card  } from 'antd';  

const RoundSearch = styled(Input.Search)`
.ant-input {
    border-radius: 10px;
  }
  `;
  
  export default function LandingPage() {
      var settings = {
          pauseOnHover: false
        };
    const movies = [
    "tempura.jpg",
    "tempura.jpg",
    "tempura.jpg",
    "tempura.jpg"
    ];
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
            <div className={styles.bottom_bg}>
                <h2 className={styles.landing_bottom_title}> Recommendations </h2>

                <div className={styles.containerA}>
                    {/* {movies.map(src => (
                    <div
                        key={src}
                        className={styles.card}
                        style={{
                        backgroundImage: `url(${src})`
                        }}
                    />
                    ))} */}

<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
<Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>

                {/* <section className={styles.card}>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                <div className={styles.card_content}></div>
                </section> */}
{/* 
                <div className={styles.scrolling_wrapper}>
                    <Card title="Card title #1" bordered={false} hoverable className={styles.card_content}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="Card title #1" bordered={false} hoverable className={styles.card}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div> */}
                {/* <Row>
                    <Col span={6} offset={1} className={styles.landing_bottom_card}>
                        <Carousel autoplay {...settings}>
                            <div>

                                <Card title="Card title #1" bordered={false} hoverable>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title #2" bordered={false} hoverable>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title #3" bordered={false}hoverable>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </div>
                            <div>

                                <Card title="Card title #1" bordered={false} hoverable>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title #2" bordered={false} hoverable>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title #3" bordered={false}hoverable>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </div>
                        </Carousel>
                    </Col>
                    <Col  span={6} offset={9} className={styles.landing_bottom_card}>
                        <Carousel autoplay {...settings}>
                            <Card title="Card title #2" bordered={false} hoverable>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                            <Card title="Card title #3" bordered={false} hoverable>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                            <Card title="Card title #1" bordered={false}hoverable>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Carousel>
                    </Col>
                    <Col  span={6} offset={17} className={styles.landing_bottom_card}>
                        <Carousel autoplay {...settings}>
                            <Card title="Card title #3" bordered={false} hoverable>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                            <Card title="Card title #1" bordered={false} hoverable>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                            <Card title="Card title #2" bordered={false}hoverable>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Carousel>
                    </Col>
                </Row> */}
            </div>
        </div>
    )
}
  