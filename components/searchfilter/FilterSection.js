import styles from '../../styles/searchfilter/FilterSection.module.css';
import { Card, Menu, Button, Modal, Row, Col, Divider } from 'antd';

import React, { useState, useEffect, useRef } from 'react';

export default function FilterSection(props) {
    const firstTimeRender = useRef(true);

    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [cuisineModalVisible, setCuisineModalVisible] = useState(false);

    const [sortOption, setSortOption] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const [cuisineFilter, setCuisineFilter] = useState(null);

    useEffect(() => {
        clearFilters();
    }, [props.searchItem]);

    useEffect(() => {
        firstTimeRender.current = false;
    }, []);

    const setSort = (sortOption) => {
        setSortOption(sortOption);
        props.setSortOption(sortOption);
    };

    function setLocation(location) {
        setLocationFilter(location);
        props.setLocationFilter(location);
    }

    function setCuisine(cuisine) {
        setCuisineFilter(cuisine);
        props.setCuisineFilter(cuisine);
    }

    const clearFilters = () => {
        setSortOption(null);
        setLocationFilter(null);
        setCuisineFilter(null);
        props.clearFilters();
    };

    // modal methods
    const showModal = (modalType) => {
        if (modalType == 'location') {
            setLocationModalVisible(true);
        } else if (modalType == 'cuisine') {
            setCuisineModalVisible(true);
        }
    };

    const handleOk = (modalType) => {
        if (modalType == 'location') {
            setLocationModalVisible(false);
        } else if (modalType == 'cuisine') {
            setCuisineModalVisible(false);
        }
    };

    const handleCancel = (modalType) => {
        if (modalType == 'location') {
            setLocationModalVisible(false);
        } else if (modalType == 'cuisine') {
            setCuisineModalVisible(false);
        }
    };

    const modalsetLocation = (location) => {
        handleOk('location');
        setLocation(location);
    };

    const modalsetCuisine = (cuisine) => {
        handleOk('cuisine');
        setCuisine(cuisine);
    };

    return (
        <Card className={styles.filterSection}>
            <h2>Filters</h2>
            <Button onClick={clearFilters} align="right">
                Clear Filters
            </Button>

            <Divider className={styles.dividerFilter} />
            <h3 id="sortMenuTitle">Sort by</h3>
            <Menu
                onSelect={(selectedKeys) => {
                    setSort(selectedKeys.key);
                }}
                selectedKeys={sortOption}>
                <Menu.Item key="rating-hl">Rating - high to low</Menu.Item>
                <Menu.Item key="cost-hl">Cost - high to low</Menu.Item>
                <Menu.Item key="cost-lh">Cost - low to high</Menu.Item>
            </Menu>

            <Divider className={styles.dividerFilter} />

            <h3 id="locationMenuTitle">Location</h3>
            <Menu
                onSelect={(selectedKeys) => {
                    if (selectedKeys.key != 'modalLocation') {
                        setLocation(selectedKeys.key);
                    }
                }}
                selectedKeys={locationFilter}>
                <Menu.Item key="Taguig">Taguig City</Menu.Item>
                <Menu.Item key="San Juan">San Juan City</Menu.Item>
                <Menu.Item key="Manila">Manila</Menu.Item>
                <Menu.Item
                    key="modalLocation"
                    onClick={() => {
                        showModal('location');
                    }}>
                    See all locations
                </Menu.Item>

                <Modal
                    visible={locationModalVisible}
                    onCancel={() => {
                        handleCancel('location');
                    }}
                    footer={null}
                    className={styles.modal}>
                    <Row align="center" className={styles.modalHeader}>
                        All Locations
                    </Row>
                    <Row>
                        <Col span={8} align="center">
                            <Button
                                type="text"
                                onClick={() => {
                                    modalsetLocation('Taguig');
                                }}>
                                Taguig City
                            </Button>
                        </Col>
                        <Col span={8} align="center">
                            <Button
                                type="text"
                                onClick={() => {
                                    modalsetLocation('Manila');
                                }}>
                                Manila City
                            </Button>
                        </Col>
                        <Col span={8} align="center">
                            <Button
                                type="text"
                                onClick={() => {
                                    modalsetLocation('San Juan');
                                }}>
                                San Juan City
                            </Button>
                        </Col>
                    </Row>
                    {/* <Divider /> */}
                    <Row>
                        <Col span={8} align="center">
                            <Button
                                type="text"
                                onClick={() => {
                                    modalsetLocation('Pasay');
                                }}>
                                Pasay City
                            </Button>
                        </Col>
                        {/* <Col span={8}>
                            <p>SAMPLE_CITY</p>
                        </Col>
                        <Col span={8}>
                            <p>SAMPLE_CITY</p>
                        </Col> */}
                    </Row>
                </Modal>
            </Menu>

            <Divider className={styles.dividerFilter} />

            <h3 id="CuisineMenuTitle">Cuisine</h3>
            <Menu
                onSelect={(selectedKeys) => {
                    if (selectedKeys.key != 'modalCuisine') {
                        setCuisine(selectedKeys.key);
                    }
                }}
                selectedKeys={cuisineFilter}>
                <Menu.Item key="American">American</Menu.Item>
                <Menu.Item key="Chinese">Chinese</Menu.Item>
                <Menu.Item key="Coffee">Coffee</Menu.Item>
                <Menu.Item
                    key="modalCuisine"
                    onClick={() => {
                        showModal('cuisine');
                    }}>
                    See all cuisines
                </Menu.Item>

                <Modal
                    visible={cuisineModalVisible}
                    onCancel={() => {
                        handleCancel('cuisine');
                    }}
                    footer={null}
                    className={styles.modal}>
                    <div>
                        <Row align="center" className={styles.modalHeader}>
                            All Cuisines
                        </Row>
                        <Row>
                            <Col span={8} align="center">
                                <Button
                                    type="text"
                                    onClick={() => {
                                        modalsetCuisine('American');
                                    }}>
                                    American
                                </Button>
                            </Col>
                            <Col span={8} align="center">
                                <Button
                                    type="text"
                                    onClick={() => {
                                        modalsetCuisine('Chinese');
                                    }}>
                                    Chinese
                                </Button>
                            </Col>
                            <Col span={8} align="center">
                                <Button
                                    type="text"
                                    onClick={() => {
                                        modalsetCuisine('Coffee');
                                    }}>
                                    Coffee
                                </Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8} align="center">
                                <Button
                                    type="text"
                                    onClick={() => {
                                        modalsetCuisine('Desserts');
                                    }}>
                                    Desserts
                                </Button>
                            </Col>
                            <Col span={8} align="center">
                                <Button
                                    type="text"
                                    onClick={() => {
                                        modalsetCuisine('Seafood');
                                    }}>
                                    Seafood
                                </Button>
                            </Col>
                            <Col span={8} align="center">
                                <Button
                                    type="text"
                                    onClick={() => {
                                        modalsetCuisine('Taiwanese');
                                    }}>
                                    Taiwanese
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </Menu>

            {/* <Menu.Item key="Caloocan">Caloocan City</Menu.Item>
                <Menu.Item key="LasPinas">Las Pinas City</Menu.Item>
                <Menu.Item key="Marikina">Marikina City</Menu.Item>
                <Menu.Item key="Manila">Manila</Menu.Item>
                <Menu.Item key="Marikina">Marikina City</Menu.Item>
                <Menu.Item key="Muntinlupa">Muntinlupa City</Menu.Item>
                <Menu.Item key="Navotas">Navotas City</Menu.Item>
                <Menu.Item key="Paranaque">Paranaque City</Menu.Item>
                <Menu.Item key="Pasay">Pasay City</Menu.Item>
                <Menu.Item key="Pasig">Pasig City</Menu.Item>
                <Menu.Item key="Pateros">Pateros City</Menu.Item>
                <Menu.Item key="Quezon">Quezon City</Menu.Item>
                <Menu.Item key="SanJuan">San Juan City</Menu.Item>
                <Menu.Item key="Taguig">Taguig City</Menu.Item>
                <Menu.Item key="Valenzuela">Valenzuela City</Menu.Item>
                <Menu.Item key="modalLocation" onClick={showModal}>See all locations</Menu.Item>
                    <Modal title="Locations" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            <p>Location 1</p> 
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                    </Modal> */}

            {/* <h3 id="cuisineMenuTitle">Cuisine</h3>
            <Menu
                // onSelect={(selectedKeys) => {
                //     setSort(selectedKeys.key);
                // }}
                // selectedKeys={sortOption}
            >
                <Menu.Item key="American">American</Menu.Item>
                <Menu.Item key="American">American</Menu.Item>
                <Menu.Item key="American">American</Menu.Item>
                <Menu.Item key="American">American</Menu.Item>
                <Menu.Item key="American">American</Menu.Item>
                <Menu.Item key="American">American</Menu.Item>
            </Menu> */}
        </Card>
    );
}
