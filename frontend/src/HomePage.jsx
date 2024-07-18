import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import zomatoLogo from './zomato-pic.jpg'; // Replace with your Zomato logo image path

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <img src={restaurant.img_url} alt={restaurant.name} />
      <h3>{restaurant.name}</h3>
      <p>{restaurant.location.address}</p>
      <p>Rating: {restaurant.user_rating.aggregate_rating}</p>
      <p>Cost for two: {restaurant.cost_for_two}</p>
      <p>Cuisines: {restaurant.cuisines}</p>
    </div>
  );
};

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    country: '',
    cost_for_two: '',
    cuisines: '',
  });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetch(`http://localhost:5000/get/search?name=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleFilter = (query, type) => {
    if (query === '') {
      return;
    }
    let endpoint = '';
    switch(type) {
      case 'cuisines':
        endpoint = `http://localhost:5000/get/filter/all?cuisines=${query}`;
        break;
      case 'country':
        endpoint = `http://localhost:5000/get/filter/all?country=${query}`;
        break;
      case 'cost_for_two':
        endpoint = `http://localhost:5000/get/filter/all?cost_for_two=${query}`;
        break;
      default:
        break;
    }
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRestaurants(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/get/page/all?page=${page}&limit=9`) // Adjust the limit as needed
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Restaurants</h1>
        {/* <img src={zomatoLogo} alt="Zomato Logo" className="zomato-logo" /> */}
        <div className="search-sections">
          <div className="search-by-cuisines">
            <h2>Search by Cuisines</h2>
            <input
              type="text"
              placeholder="Search by Cuisines..."
              value={searchQuery.cuisines}
              onChange={(e) => setSearchQuery({ ...searchQuery, cuisines: e.target.value })}
              className="search-input"
            />
            <button onClick={() => handleFilter(searchQuery.cuisines, 'cuisines')}>Search</button>
          </div>
          <div className="search-by-country">
            <h2>Search by Country</h2>
            <input
              type="text"
              placeholder="Search by Country..."
              value={searchQuery.country}
              onChange={(e) => setSearchQuery({ ...searchQuery, country: e.target.value })}
              className="search-input"
            />
            <button onClick={() => handleFilter(searchQuery.country, 'country')}>Search</button>
          </div>
          <div className="search-by-cost">
            <h2>Search by Cost</h2>
            <input
              type="text"
              placeholder="Search by Cost..."
              value={searchQuery.cost_for_two}
              onChange={(e) => setSearchQuery({ ...searchQuery, cost_for_two: e.target.value })}
              className="search-input"
            />
            <button onClick={() => handleFilter(searchQuery.cost_for_two, 'cost_for_two')}>Search</button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery.name}
          onChange={(e) => setSearchQuery({ ...searchQuery, name: e.target.value })}
          className="search-input"
        />
        <button onClick={() => handleSearch(searchQuery.name)}>Search</button>
      </header>
      <div className="restaurant-list">
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          />
        ))}
      </div>
      {/* adding pagination */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
