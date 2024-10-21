import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Fetch events from the API (replace with your API endpoint)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/holidays?country=US&year=2024');
        const data = await response.json();
        setEvents(data.response.holidays); // Assuming the API returns holidays in this structure
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Function to check if there are events on a specific date
  const tileContent = ({ date }) => {
    const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const eventsOnDate = events.filter(event => event.date.iso === dateString);
    return eventsOnDate.length > 0 ? <span>{eventsOnDate.length} Event(s)</span> : null;
  };

  return (
    <div>
      <h1>Event Calendar</h1>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent} // Display events on tiles
      />
      <h2>Events on {date.toDateString()}:</h2>
      <ul>
        {events
          .filter(event => event.date.iso === date.toISOString().split('T')[0]) // Filter events for selected date
          .map(event => (
            <li key={event.name}>{event.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default EventCalendar;
