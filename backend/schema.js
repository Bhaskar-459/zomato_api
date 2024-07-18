import mongoose from 'mongoose';
let Zomato = new mongoose.Schema({
    id: Number,
    name: String,
    cuisines: String,
    location: Object,
    img_url: String,
    event_url: String,
    menu_url: String,
    book_url: String,
    url: String,
    user_rating: Object,
    cost_for_two: Number,
    zomato_events: Array
});

export default mongoose.model('Restaurant', Zomato);