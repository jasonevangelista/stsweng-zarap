import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
    const {
        query: { id, sort, filter }
    } = req;
    console.log('=== QUERIES ===');
    console.log('ID: ' + id);
    if (sort != '') {
        console.log('SORT: ' + sort);
    } else {
        console.log('NO SORT OPTION');
    }
    if (filter != '') {
        console.log('FILTER: ' + filter);
    } else {
        console.log('NO FILTER OPTION');
    }

    const { db } = await connectToDatabase();

    // no sort and filter
    if (sort == 'none' && filter == 'none') {
        console.log('no sort and filter');
        var restaurants = await db
            .collection('restaurant')
            .find({ name: { $regex: id, $options: 'i' } })
            .toArray();
    }
    // has only sort
    else if (sort != 'none' && filter == 'none') {
        console.log('has only sort');
        // averageRating - high to low (-1)
        if (sort == 'rating-hl') {
            var restaurants = await db
                .collection('restaurant')
                .find({ name: { $regex: id, $options: 'i' } })
                .sort({ averageRating: -1 })
                .toArray();
        }
        // averageCost - high to low (-1)
        else if (sort == 'cost-hl') {
            var restaurants = await db
                .collection('restaurant')
                .find({ name: { $regex: id, $options: 'i' } })
                .sort({ averageCost: -1 })
                .toArray();
        }
        // averageCost - low to high (1)
        else if (sort == 'cost-lh') {
            var restaurants = await db
                .collection('restaurant')
                .find({ name: { $regex: id, $options: 'i' } })
                .sort({ averageCost: 1 })
                .toArray();
        }
        // if params are invalid, will perform query without any sort/filter
        else {
            var restaurants = await db
                .collection('restaurant')
                .find({ name: { $regex: id, $options: 'i' } })
                .toArray();
        }
    }
    // has only filter
    else if (sort == 'none' && filter != 'none') {
        console.log('has only filter');
        var restaurants = await db
            .collection('restaurant')
            .find({ name: { $regex: id, $options: 'i' }, city: 'Taguig' })
            // .sort({ averageCost: 1})
            .toArray();
    }
    // has both sort and filter
    else {
        console.log('has both sort and filter');
        var restaurants = await db
            .collection('restaurant')
            .find({ name: { $regex: id, $options: 'i' }, city: 'Taguig' })
            .sort({ averageCost: 1 })
            .toArray();
    }

    res.json(restaurants);
};
