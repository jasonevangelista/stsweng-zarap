import React from 'react';
import { Image } from 'antd';

export default function ImageHeader({ imageURL }) {
    return (
        <div style={{ maxHeight: '250px', overflow: 'hidden' }}>
            {imageURL ? (
                <Image
                    width="100%"
                    style={{ marginTop: '-180px', position: 'relative' }}
                    preview={false}
                    src={imageURL}
                />
            ) : (
                <Image
                    width="100%"
                    style={{ marginTop: '-180px', position: 'relative' }}
                    preview={false}
                    src="https://i1.wp.com/www.angsarap.net/wp-content/uploads/2019/11/Chicken-Katsu-Curry-Wide.jpg?fit=1080%2C720&ssl=1"
                />
            )}
        </div>
    );
}
