import React from "react";
import { Image } from "antd";

export default function ImageHeader() {
  return (
    <div style={{ height: "250px", overflow: "hidden" }}>
      <Image
        width="100%"
        style={{ marginTop: "-180px" }}
        src="https://i1.wp.com/www.angsarap.net/wp-content/uploads/2019/11/Chicken-Katsu-Curry-Wide.jpg?fit=1080%2C720&ssl=1"
      />
    </div>
  );
}
