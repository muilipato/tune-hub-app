import React, { useState, useEffect } from 'react';

const Location = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchEventsNearUser = () => {
    // Use userLocation.latitude and userLocation.longitude to fetch events from the backend
    // You can make an API call to your backend endpoint to get the events near the user's location
    // For example:
    // fetch(`http://your-backend-api/events?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`)
    //   .then((response) => response.json())
    //   .then((data) => setEvents(data));

    // Mocking the events data for demonstration
    const mockEvents = [
      { id: 1, title: 'Event 1', location: 'Location 1' },
      { id: 2, title: 'Event 2', location: 'Location 2' },
      { id: 3, title: 'Event 3', location: 'Location 3' },
    ];

    setEvents(mockEvents);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchEventsNearUser();
    }
  }, [userLocation]);

  return (
    <div>
      {userLocation ? (
        <div>
          <h2>Events near you</h2>
          {events.length > 0 ? (
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong> - {event.location}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events found near your location.</p>
          )}
        </div>
      ) : (
        <p>Loading user location...</p>
      )}
    </div>
  );
};

export default Location;
