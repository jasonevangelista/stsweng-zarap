import React from "react";
import { Descriptions, Typography } from "antd";
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
        <Descriptions
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item
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
            label={
              <div>
                <MoneyCollectOutlined />
                &nbsp;Avg. Cost for Two
              </div>
            }
          >
            {resto.averageCost}
          </Descriptions.Item>
          <Descriptions.Item
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
    </div>
  );
}
