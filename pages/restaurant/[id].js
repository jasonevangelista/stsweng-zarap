import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";

export default function RestaurantProfile({ resto }) {
  return (
    <div>
      <p>Resto ID: {resto._id}</p>
      <p>Resto Name: {resto.name}</p>
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
