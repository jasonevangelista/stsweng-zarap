import React from 'react';
import { Image } from 'antd';

export default function ImageHeader({ imageURL }) {
  return (
    <div style={{ maxHeight: '250px', overflow: 'hidden' }}>
      <Image
        width="100%"
        style={{ marginTop: '-180px', position: 'relative' }}
        preview={false}
        src={imageURL}
        fallback=""
      />
    </div>
  );
}
