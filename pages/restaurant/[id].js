import { connectToDatabase } from '../../util/mongodb'
import { ObjectId } from 'mongodb';


export default function SearchFilter({ resto }) {

  console.log("resto:")
  console.log(resto)
  return (

    <div>
      <p>Resto ID: {resto._id}</p>
      <p>Resto Name: {resto.name}</p>
    </div>
  )
}


export async function getServerSideProps(context) {
  const restaurantID = context.params.id
  console.log('restaurant id: ' + restaurantID)

  // param must be a single string of 12 bytes or a string of 24 hex characters
  
  const { db } = await connectToDatabase();

  const restaurant = await db
    .collection("restaurant")
    .find({ _id: ObjectId(restaurantID) })
    .limit(1)
    .toArray();

  if (restaurant.length > 0){
    var results = JSON.parse(JSON.stringify(restaurant))
    console.log("resto:")
    console.log(results[0])
    return {
      props: {
        resto: results[0]
      }
    };
  }
  else{
    return{
      props: {
        resto: null
      }
    }
  }
  
}

