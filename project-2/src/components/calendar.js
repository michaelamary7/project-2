import React, { useEffect, useState } from 'react';

const Calendar = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('/api/holidays?country=US&year=2024');
        const data = await response.json();
        setHolidays(data.response.holidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div>
      <h1>Holidays</h1>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.name}>{holiday.name} - {holiday.date.iso}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
