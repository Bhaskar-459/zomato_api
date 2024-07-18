import Restaurant from '../schema.js';

const getSearchFunc = async (req, res) => {
  try {
    const query = req.query.name;
    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
    const result = await Restaurant.find({ name: searchRegex });
    // show only unique results
    const uniqueResult = result.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);

    res.json(uniqueResult);
  } catch (error) {
    console.error('Error in search functionality:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default getSearchFunc;
