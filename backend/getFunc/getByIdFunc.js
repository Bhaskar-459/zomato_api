import Restuarant from '../schema.js';
const getByIdFunc = async (req,res) => {
    const id = req.params.id;
    try {
        const restaurant = await Restuarant.findOne({id: id});
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default getByIdFunc;