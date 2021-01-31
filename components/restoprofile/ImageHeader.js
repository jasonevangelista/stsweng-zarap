import React from 'react';
import { Image } from 'antd';
import styles from '../../styles/restoprofile/imageheader.module.css';


export default function ImageHeader({ imageURL }) {
  return (
    <div className={styles.imageDiv}>
      <Image
        width="100%"
        className={styles.image}
        // style={{ marginTop: '-180px', position: 'relative' }}
        preview={false}
        src={imageURL}
        fallback=""
      />
    </div>
  );
}
