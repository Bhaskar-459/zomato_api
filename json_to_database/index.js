import fs from 'fs';
import mongoose from 'mongoose';
import RestaurantModel from '../backend/schema.js';

let allRestaurantData = [];

for (let fileIndex = 1; fileIndex <= 5; fileIndex++) {
    let jsonData = JSON.parse(fs.readFileSync(`./Database/file${fileIndex}.json`, 'utf8'));
    let parsedData = jsonData.map(data => {
        if (data.restaurants == null) {
            return null;
        }
        let obj = data.restaurants;
        return obj.map(r => {
            return {
                id: r.restaurant.id ?? null,
                name: r.restaurant.name ?? null,
                cuisines: r.restaurant.cuisines ?? null,
                location: r.restaurant.location ?? null,
                img_url: r.restaurant.thumb ?? null,
                event_url: r.restaurant.events_url ?? null,
                menu_url: r.restaurant.menu_url ?? null,
                book_url: r.restaurant.book_url ?? null,
                url: r.restaurant.url ?? null,
                user_rating: r.restaurant.user_rating ?? null,
                cost_for_two: r.restaurant.average_cost_for_two ?? null,
                zomato_events: r.restaurant.zomato_events ?? null
            };
        });
    });

    parsedData = parsedData.filter(element => element !== null);
    
    for (let i = 0; i < parsedData.length; i++) {
        for (let j = 0; j < parsedData[i].length; j++) {
            allRestaurantData.push(parsedData[i][j]);
        }
    }
}

mongoose.connect("mongodb+srv://m03bhaskar:bhaskar459@zomato.sl3ap4z.mongodb.net/?retryWrites=true&w=majority&appName=zomato")
    .then(() => {
        console.log('Connected to MongoDB');
        RestaurantModel.insertMany(allRestaurantData);
        console.log("Data inserted successfully");
    })
    .catch((error) => {
        console.log("Connection error:", error.message);
    });
