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
        const response = await fetch('http://localhost:5432/api/holidays'); // Ensure the correct API call
  
        // Check if response is okay (status 200)
        if (!response.ok) {
          const errorText = await response.text(); // Get error response for debugging
          console.error('Error fetching events:', errorText);
          throw new Error('Network response was not ok');
        }
  
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json(); // Parse JSON
  
          // Check the structure of the response
          if (data.response && data.response.holidays) {
            setEvents(data.response.holidays);
          } else {
            console.error('Unexpected response structure:', data);
          }
        } else {
          // If not JSON, log the content type and the response body for debugging
          const textResponse = await response.text();
          console.error('Response is not JSON:', contentType, textResponse);
        }
  
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
      <h2 className="react-calendar_title">Event Calendar</h2>
      
      {/* Add a custom class to the calendar */}
      <div className="custom-calendar-body">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent} // Display marker for event dates
          className="my-custom-calendar" // Custom class for additional styling
        />
      </div>

      <div className="events-list">
        <h3>Events on {date.toDateString()}</h3>
        <ul>
          {events
            .filter(event => event.date.iso === date.toISOString().split('T')[0])
            .map(event => (
              <li key={event.name}>{event.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventCalendar;
