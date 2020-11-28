import React from "react";
import { Carousel, Typography } from "antd";
import GalleryItem from "./GalleryItem";

const { Title } = Typography;

export default function Gallery() {
  return (
    <div>
      <Title level={3}>Gallery</Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Carousel
          focusOnSelect
          swipeToSlide
          autoplay
          dots
          arrows
          style={{ width: "500px", height: "500px" }}
        >
          <div>
            <GalleryItem src="https://images.besttemplates.com/2431/Modern-Restaurant-07-02.jpg" />
          </div>
          <div>
            <GalleryItem src="https://b.zmtcdn.com/data/menus/662/18199662/7c0067d56a2a0ca3eba4a4ce09bf8f74.jpg" />
          </div>
          <div>
            <GalleryItem src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/117520118/original/97b74413d19313b1d51958209e87e414a4ba3719/design-restaurant-menu-menu-design-food-menu-price-list-menu-catalog-pdf-flyer.jpg" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
