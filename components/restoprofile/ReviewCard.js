import React from "react";
import { Card, Typography, Rate } from "antd";

const { Text, Paragraph } = Typography;

export default function ReviewCard() {
  return (
    <div>
      <Card>
        <div>
          <Text strong>Naruto Matsumoto &nbsp;&nbsp;</Text>
          <Rate value={1} />
        </div>
        <br />
        <div>
          <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
            Situation admitting promotion at or to perceived be. Mr acuteness we
            as estimable enjoyment up. An held late as felt know. Learn do allow
            solid to grave. Middleton suspicion age her attention. Chiefly
            several bed its wishing. Is so moments on chamber pressed to.
            Doubtful yet way properly answered humanity its desirous. Minuter
            believe service arrived civilly add all. Acuteness allowance an at
            eagerness favourite in extensive exquisite ye. <br />
            Situation admitting promotion at or to perceived be. Mr acuteness we
            as estimable enjoyment up. An held late as felt know. Learn do allow
            solid to grave. Middleton suspicion age her attention. Chiefly
            several bed its wishing. Is so moments on chamber pressed to.
            Doubtful yet way properly answered humanity its desirous. Minuter
            believe service arrived civilly add all. Acuteness allowance an at
            eagerness favourite in extensive exquisite ye.
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}
