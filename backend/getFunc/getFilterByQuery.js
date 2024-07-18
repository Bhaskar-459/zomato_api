import Restaurant from '../schema.js';

import CountryCodes from '../CodesofCount.js';

const getFilterByQuery = async (req, res) => {
    try {
        const { country, cost_for_two, cuisines } = req.query;
        const query = {};

        if (country) {
            const countryCode = CountryCodes.find(c => c.Country.toLowerCase() === country.toLowerCase());
            if (countryCode) {
                query['location.country_id'] = parseInt(countryCode.CountryCode);
            }
        }

        if (cost_for_two) {
            query.cost_for_two = { $lte: parseInt(cost_for_two) };
        }

        if (cuisines) {
            query.cuisines = new RegExp(cuisines, 'i');
        }

        const allRestaurants = await Restaurant.find(query);
        const uniqueRestaurants = allRestaurants.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

        res.status(200).json({ data: uniqueRestaurants });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default getFilterByQuery;




