import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  const {
    query: { id, sort, filter },
  } = req;

  var filterQuery = JSON.parse(filter);
  // console.log('=== QUERIES ===');
  // console.log('ID: ' + id);
  // if (sort != '') {
  //     console.log('SORT: ' + sort);
  // } else {
  //     console.log('NO SORT OPTION');
  // }
  // if (filter != '') {
  //     console.log('FILTER: ' + filter);
  // } else {
  //     console.log('NO FILTER OPTION');
  // }
  
  const { db } = await connectToDatabase();
  var restaurants;

  // no sort and filter
  if (sort == 'none' && filterQuery.location == null && filterQuery.cuisine == null) {
    restaurants = await db
      .collection('restaurant')
      .find({ name: { $regex: id, $options: 'i' } })
      .toArray();
  } else {
    var filterOption = {
      name: { $regex: id, $options: 'i' }
    };
    var sortOption = {};

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
  res.json(restaurants);
};
