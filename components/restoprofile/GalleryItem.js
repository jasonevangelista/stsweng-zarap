import React from "react";
import { Image } from "antd";
import styles from "../../styles/restoprofile/gallery.module.css";

export default function GalleryItem({ src }) {
  return (
    <div className={styles.carouselItem}>
      <Image height="100%" src={src} />
    </div>
  );
}
