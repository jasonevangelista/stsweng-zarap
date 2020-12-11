import styles from '../../styles/searchfilter/FilterSection.module.css';
import { Card, Divider, Menu, Button, Modal } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

import React, { useState, useEffect, useRef } from 'react';

export default function FilterSection(props) {
  const firstTimeRender = useRef(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    clearFilters();
  }, [props.searchItem]);

  useEffect(() => {
    firstTimeRender.current = false;
  }, []);

  function setSort(value) {
    setSortOption(value);
    props.setSortOption(value);
  }

  const clearFilters = () => {
    setSortOption(null);
    props.clearFilters();
  };

  // modal methods
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card className={styles.filterSection}>
      <h2>Filters</h2>
      <Button onClick={clearFilters}>Clear Filters</Button>
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

      {/* <h3 id="locationMenuTitle">Location</h3>
            <Menu
                // onSelect={(selectedKeys) => {
                //     setSort(selectedKeys.key);
                // }}
                // selectedKeys={sortOption}
            >
                <Menu.Item key="Caloocan">Caloocan City</Menu.Item>
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
                    </Modal>
            </Menu>
            <h3 id="cuisineMenuTitle">Cuisine</h3>
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
