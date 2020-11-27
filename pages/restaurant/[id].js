import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";
import { Tabs, Typography, Rate } from "antd";

import InfoTab from "../../components/restoprofile/InfoTab";
import ImageHeader from "../../components/restoprofile/ImageHeader";
import ReviewTab from "../../components/restoprofile/ReviewTab"

const { Title, Text } = Typography;

export default function RestaurantProfile({ resto }) {
  return (
    <div
      style={{
        backgroundColor: "#C4C4C4",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          backgroundColor: "white",
          borderRadius: "15px",
          overflow: "hidden",
          margin: "30px 20px",
        }}
      >
        <ImageHeader />

        <div style={{ padding: "30px" }}>
          <div className="title-block">
            <Title>Restaurant</Title>
            <Rate allowHalf value={5} disabled />
            &nbsp;&nbsp;&nbsp;
            <Text>Based on 10 Reviews</Text>
          </div>

          <Tabs style={{ marginTop: "20px" }} defaultActiveKey="1">
            <Tabs.TabPane tab="Basic Information" key="1">
              <InfoTab resto={resto} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Reviews" key="2">
              <ReviewTab />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function isHex(str) {
  return /^[A-F0-9]+$/i.test(str);
}

export async function getServerSideProps(context) {
  const restaurantID = context.params.id;
  console.log("restaurant id: " + restaurantID);

  // check if params is in valid form (24-character hex string)
  if (restaurantID.length != 24 || !isHex(restaurantID)) {
    console.log("invalid params!!!");
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const { db } = await connectToDatabase();

  const restaurant = await db
    .collection("restaurant")
    .find({ _id: ObjectId(restaurantID) })
    .limit(1)
    .toArray();

  if (restaurant.length > 0) {
    var results = JSON.parse(JSON.stringify(restaurant));
    console.log("resto:");
    console.log(results[0]);
    return {
      props: {
        resto: results[0],
      },
    };
  }

  // if data is empty
  else {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
