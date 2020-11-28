import React from "react";
import { Image } from "antd";

export default function GalleryItem({ src }) {
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image height="100%" src={src} />
    </div>
  );
}
