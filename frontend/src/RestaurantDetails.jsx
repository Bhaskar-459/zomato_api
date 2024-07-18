import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetails.css';
import EventCard from './EventCard';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base_url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${base_url}/get/getById/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    restaurant && (
      <div className="restaurant-details">
        <h2>{restaurant.name}</h2>
        <img src={restaurant.img_url} alt={restaurant.name} className="restaurant-image" />
        <p>{restaurant.cuisines}</p>
        <p>{restaurant.location.address}</p>
        <p>Rating: {restaurant.user_rating.aggregate_rating} ({restaurant.user_rating.votes} votes)</p>
        <p>Cost for Two: ₹{restaurant.cost_for_two}</p>
        <a href={restaurant.menu_url} target="_blank" rel="noopener noreferrer">View Menu</a> | 
        <a href={restaurant.book_url} target="_blank" rel="noopener noreferrer">Book Now</a> | 
        <a href={restaurant.url} target="_blank" rel="noopener noreferrer">More Info</a>
        {Array.isArray(restaurant.zomato_events) && restaurant.zomato_events.length > 0 && (
          <div className="events">
            <h4>Events:</h4>
            {restaurant.zomato_events.map(eventItem => (
              <EventCard key={eventItem.event.event_id} event={eventItem.event} />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default RestaurantDetails;

