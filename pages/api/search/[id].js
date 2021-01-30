import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const {
    query: { id, sort, filter },
  } = req;

  const filterQuery = JSON.parse(filter);
  
  const { db } = await connectToDatabase();
  let restaurants;

  // no sort and filter
  if (sort == 'none' && filterQuery.location == null && filterQuery.cuisine == null) {
    restaurants = await db
      .collection('restaurant')
      .find({ name: { $regex: id, $options: 'i' } })
      .toArray();
  } else {
    const filterOption = {
      name: { $regex: id, $options: 'i' }
    };
    const sortOption = {};

    // SORTING OPTION
    // averageRating - high to low (-1)
    if (sort == 'rating-hl') {
      sortOption = { averageRating: -1 };
    }
    // averageCost - high to low (-1)
    else if (sort == 'cost-hl') {
      sortOption = { averageCost: -1 };
    }
    // averageCost - low to high (1)
    else if (sort == 'cost-lh') {
      sortOption = { averageCost: 1 };
    }

    // FILTER OPTIONS
    // location
    if (filterQuery.location) {
      filterOption.city = filterQuery.location;
    }
    // cuisine
    if (filterQuery.cuisine) {
      filterOption.cuisineType = filterQuery.cuisine;
    }

    restaurants = await db
      .collection('restaurant')
      .find(filterOption)
      .sort(sortOption)
      .toArray();
  }

  for(let i = 0; i < restaurants.length; i++){
    let currentResto = restaurants[i]
    let reviews = await db.collection('review').find({ restaurantID: ObjectId(currentResto._id) }).project({ rating: 1, _id: 0 }).toArray();
    restaurants[i].averageRating = computeAverageScore(reviews)
    restaurants[i].reviewCount = reviews.length
    }

  res.json(restaurants);
};


function computeAverageScore(reviews){
  let total = 0;
  let average = 0;
  if(reviews.length > 0){
    for(let i = 0; i < reviews.length; i++){
      total += reviews[i].rating;
    }
    average = total / reviews.length;
    return average;
  }
  return 0;
}