import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calendar = () => {
    const [holidays, setHolidays] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/holidays', {
                    params: {
                        country: 'US',
                        year: '2024'
                    }
                });
                setHolidays(response.data.response.holidays);
            } catch (error) {
                console.error('Error fetching holidays', error);
                setError('Failed to fetch holidays');
            }
        };
        fetchHolidays();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Holidays</h1>
            <ul>
                {holidays.map(holiday => (
                    <li key={holiday.name}>{holiday.name} - {holiday.date.iso}</li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;