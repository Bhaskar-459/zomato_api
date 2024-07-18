import Restaurant from '../schema.js';

const getAllFunc = async (req, res) => {
    try {
        const allRestaurants = await Restaurant.find();
        res.status(200).json(allRestaurants);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default getAllFunc;
