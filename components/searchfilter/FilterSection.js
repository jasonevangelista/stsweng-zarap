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

  let selectedCuisineFromModal;
  let selectedLocationFromModal;
  if (
    locationFilter &&
    locationFilter != 'Manila' &&
    locationFilter != 'Taguig' &&
    locationFilter != 'San Juan' &&
    locationFilter != 'Makati'
  ) {
    selectedLocationFromModal = (
      <Menu.Item key={locationFilter} className="menuOption">
        {locationFilter} City
      </Menu.Item>
    );
  } else {
    selectedLocationFromModal = null;
  }

  if (
    cuisineFilter &&
    cuisineFilter != 'American' &&
    cuisineFilter != 'Chinese' &&
    cuisineFilter != 'Coffee'
  ) {
    selectedCuisineFromModal = (
      <Menu.Item key={cuisineFilter} className="menuOption">
        {cuisineFilter}
      </Menu.Item>
    );
  } else {
    selectedCuisineFromModal = null;
  }

  useEffect(() => {
    clearFilters();
    setSortOption(null);
  }, [props.searchItem]);

  useEffect(() => {
    firstTimeRender.current = false;
  }, []);

  const setSort = (currSortOption) => {
    if (currSortOption != sortOption) {
      setSortOption(currSortOption);
      props.setSortOption(currSortOption);
    } else {
      setSortOption(null);
      props.setSortOption(null);
    }
  };

  function setLocation(location) {
    if (location != locationFilter) {
      setLocationFilter(location);
      props.setLocationFilter(location);
    } else {
      setLocationFilter(null);
      props.setLocationFilter(null);
    }
  }

  function setCuisine(cuisine) {
    if (cuisine != cuisineFilter) {
      setCuisineFilter(cuisine);
      props.setCuisineFilter(cuisine);
    } else {
      setCuisineFilter(null);
      props.setCuisineFilter(null);
    }
  }

  const clearFilters = () => {
    setLocationFilter(null);
    setCuisineFilter(null);
    props.clearFilters();
  };
  const clearSort = () => {
    setSortOption(null);
    props.setSortOption(null);
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
      <Row>
        <div className={styles.labelContainer}>
          <span className={styles.headerFilterSort}>
            <h2>Sort by</h2>
          </span>
          <span className={styles.spanContainer}>
            <Button onClick={clearSort} className={[styles.clearButton,"btnSearchFilter"]}>
              Clear Sort
            </Button>
          </span>
        </div>
      </Row>

      <Menu
        onClick={(selectedKeys) => {
          setSort(selectedKeys.key);
        }}
        selectedKeys={sortOption}>
        <Menu.Item key="rating-hl" className="menuOption">
          Rating - high to low
        </Menu.Item>
        <Menu.Item key="cost-hl" className="menuOption">
          Cost - high to low
        </Menu.Item>
        <Menu.Item key="cost-lh" className="menuOption">
          Cost - low to high
        </Menu.Item>
      </Menu>

      <Divider className={styles.dividerFilter} />

      <Row>
        <div className={styles.labelContainer}>
          <span className={styles.headerFilterSort}>
            <h2>Filters</h2>
          </span>
          <span className={styles.spanContainer}>
            <Button onClick={clearFilters} className={[styles.clearButton,"btnSearchFilter"]}>
              Clear Filters
            </Button>
          </span>
        </div>
      </Row>

      <h3 id="locationMenuTitle">Location</h3>
      <Menu
        mode="inline"
        onClick={(selectedKeys) => {
          if (selectedKeys.key != 'modalLocation') {
            setLocation(selectedKeys.key);
          }
        }}
        selectedKeys={locationFilter}>
        {selectedLocationFromModal}
        <Menu.Item key="Taguig" className="menuOption">
          Taguig City
        </Menu.Item>
        <Menu.Item key="San Juan" className="menuOption">
          San Juan City
        </Menu.Item>
        <Menu.Item key="Manila" className="menuOption">
          Manila City
        </Menu.Item>
        <Menu.Item key="Makati" className="menuOption">
          Makati City
        </Menu.Item>
        <Menu.Item
          className={styles.seeAllOption}
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
                className={locationFilter == 'Taguig' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Taguig');
                }}>
                Taguig City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Manila' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Manila');
                }}>
                Manila City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'San Juan' ? 'modalBtnSelected' : null}
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
                className={locationFilter == 'Makati' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Makati');
                }}>
                Makati City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Pasay' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Pasay');
                }}>
                Pasay City
              </Button>
            </Col>

            {/* CITIES WITHOUT ANY DATA IN DB */}
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Caloocan' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Caloocan');
                }}
              >
                Caloocan City
              </Button>
            </Col>
          </Row>

          <Row>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Las Pinas' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Las Pinas');
                }}
              >
                Las Pinas City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Marikina' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Marikina');
                }}
              >
                Marikina City
              </Button>
            </Col>
          
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Muntinlupa' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Muntinlupa');
                }}
              >
                Muntinlupa City
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Navotas' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Navotas');
                }}
              >
                Navotas City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Paranaque' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Paranaque');
                }}
              >
                Paranaque City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Pasig' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Pasig');
                }}
              >
                Pasig City
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Pateros' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Pateros');
                }}
              >
                Pateros City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Quezon' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Quezon');
                }}
              >
                Quezon City
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                className={locationFilter == 'Valenzuela' ? 'modalBtnSelected' : null}
                type="text"
                onClick={() => {
                  modalsetLocation('Valenzuela');
                }}
              >
                Valenzuela City
              </Button>
            </Col>
          </Row>


        </Modal>
      </Menu>


      <Divider className={styles.dividerFilter} />

      <h3 id="CuisineMenuTitle">Cuisine</h3>
      <Menu
        onClick={(selectedKeys) => {
          if (selectedKeys.key != 'modalCuisine') {
            setCuisine(selectedKeys.key);
          }
        }}
        selectedKeys={cuisineFilter}>
        {selectedCuisineFromModal}
        <Menu.Item key="American" className="menuOption">
          American
        </Menu.Item>
        <Menu.Item key="Chinese" className="menuOption">
          Chinese
        </Menu.Item>
        <Menu.Item key="Coffee" className="menuOption">
          Coffee
        </Menu.Item>
        <Menu.Item
          className={styles.seeAllOption}
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
                  className={cuisineFilter == 'American' ? 'modalBtnSelected' : null}
                  type="text"
                  onClick={() => {
                    modalsetCuisine('American');
                  }}>
                  American
                </Button>
              </Col>
              <Col span={8} align="center">
                <Button
                  className={cuisineFilter == 'Chinese' ? 'modalBtnSelected' : null}
                  type="text"
                  onClick={() => {
                    modalsetCuisine('Chinese');
                  }}>
                  Chinese
                </Button>
              </Col>
              <Col span={8} align="center">
                <Button
                  className={cuisineFilter == 'Coffee' ? 'modalBtnSelected' : null}
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
                  className={cuisineFilter == 'Desserts' ? 'modalBtnSelected' : null}
                  type="text"
                  onClick={() => {
                    modalsetCuisine('Desserts');
                  }}>
                  Desserts
                </Button>
              </Col>
              <Col span={8} align="center">
                <Button
                  className={cuisineFilter == 'Seafood' ? 'modalBtnSelected' : null}
                  type="text"
                  onClick={() => {
                    modalsetCuisine('Seafood');
                  }}>
                  Seafood
                </Button>
              </Col>
              <Col span={8} align="center">
                <Button
                  className={cuisineFilter == 'Taiwanese' ? 'modalBtnSelected' : null}
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
