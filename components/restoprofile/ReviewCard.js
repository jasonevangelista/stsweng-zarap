import React from "react";
import { Card, Typography, Rate, Space } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

export default function ReviewCard() {
  return (
    <div>
      <Card>
        <Space>
          <div>
            <div>
              <Text strong>Naruto Matsumoto &nbsp;&nbsp;</Text>
              <Rate value={1} />
            </div>
            <br />
            <div>
              <Space>
                <Paragraph
                  ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                >
                  Situation admitting promotion at or to perceived be. Mr
                  acuteness we as estimable enjoyment up. An held late as felt
                  know. Learn do allow solid to grave. Middleton suspicion age
                  her attention. Chiefly several bed its wishing. Is so moments
                  on chamber pressed to. Doubtful yet way properly answered
                  humanity its desirous. Minuter believe service arrived civilly
                  add all. Acuteness allowance an at eagerness favourite in
                  extensive exquisite ye. <br />
                  Situation admitting promotion at or to perceived be. Mr
                  acuteness we as estimable enjoyment up. An held late as felt
                  know. Learn do allow solid to grave. Middleton suspicion age
                  her attention. Chiefly several bed its wishing. Is so moments
                  on chamber pressed to. Doubtful yet way properly answered
                  humanity its desirous. Minuter believe service arrived civilly
                  add all. Acuteness allowance an at eagerness favourite in
                  extensive exquisite ye.
                </Paragraph>
              </Space>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              width: "75px",
            }}
          >
            <HeartOutlined style={{ fontSize: "1.5rem" }} />
            <Text>420 Likes</Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}
