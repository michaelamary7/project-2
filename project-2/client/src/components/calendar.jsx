
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
Grace's-Branch
        const response = await axios.get('http://localhost:5173/api/holidays');

        const response = await axios.get('/api/holidays?country=US&year=2024');
Christian
        setHolidays(response.data.response.holidays);
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

 Grace's-Branch
export default Calendar;

export default Calendar;
 Christian
