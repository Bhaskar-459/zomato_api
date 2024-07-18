import Restaurant from '../schema.js';

const getAllFunc = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the skip value
        const skip = (page - 1) * limit;

        // Query to fetch paginated results
        const allRestaurants = await Restaurant.find()
            .skip(skip)
            .limit(limit)

        res.status(200).json(allRestaurants);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default getAllFunc;
