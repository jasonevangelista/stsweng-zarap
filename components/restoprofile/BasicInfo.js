import React from "react";
import { Row, Col, Descriptions, Typography } from "antd";
import {
  ShopOutlined,
  ClockCircleOutlined,
  MoneyCollectOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function BasicInfo({ resto }) {
  return (
    <div>
      <Title level={3}>Basic Information</Title>
      <Row>
        <Col>
          <Descriptions bordered column={4}>
            <Descriptions.Item
              span={2}
              label={
                <div>
                  <ShopOutlined />
                  &nbsp;Est. Type
                </div>
              }
            >
              {resto.establishmentType}
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
              label={
                <div>
                  <MoneyCollectOutlined />
                  &nbsp;Avg. Cost
                </div>
              }
            >
              {resto.averageCost}
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
              label={
                <div>
                  <ClockCircleOutlined />
                  &nbsp;Open Hours
                </div>
              }
            >
              {resto.openHours.map((item, i) => {
                return (
                  <div key={i}>
                    {item} <br />
                  </div>
                );
              })}
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
              label={
                <div>
                  <PhoneOutlined />
                  &nbsp;Contact Details
                </div>
              }
            >
              {resto.contactDetails.map((item, i) => {
                return (
                  <div key={i}>
                    {item} <br />
                  </div>
                );
              })}
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
              label={
                <div>
                  <EnvironmentOutlined />
                  &nbsp;Location
                </div>
              }
            >
              {resto.city}
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
              label={
                <div>
                  <EnvironmentOutlined />
                  &nbsp;Address
                </div>
              }
            >
              {resto.fullAddress}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  );
}
