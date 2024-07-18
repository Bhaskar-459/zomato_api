import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h5>{event.title}</h5>
      <p>{event.description}</p>
      <p>{event.display_date} | {event.display_time}</p>
      {event.photos.map(photo => (
        <img key={photo.photo.photo_id} src={photo.photo.thumb_url} alt={event.title} className="event-photo" />
      ))}
    </div>
  );
};

export default EventCard;
