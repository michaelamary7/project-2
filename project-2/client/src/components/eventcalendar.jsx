import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Calendar component CSS

const EventCalendar = () => {
  const [date, setDate] = useState(new Date()); // Stores selected date
  const [events, setEvents] = useState([]);     // Stores events from the API

  // Fetch events from an API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/holidays?country=US&year=2024'); // Replace with your API call
        const data = await response.json();
        setEvents(data.response.holidays); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const tileContent = ({ date }) => {
    const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const eventsOnDate = events.filter(event => event.date.iso === dateString);
    return eventsOnDate.length > 0 ? <span className="event-marker">•</span> : null; // Mark the date
  };

  return (
    <div className="calendar-container">
      <h2>Event Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent} // Display marker for event dates
      />
      
      <div className="events-list">
        <h3>Events on {date.toDateString()}</h3>
        <ul>
          {events
            .filter(event => event.date.iso === date.toISOString().split('T')[0]) // Filter events for selected date
            .map(event => (
              <li key={event.name}>{event.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventCalendar;