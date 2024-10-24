import React, { useState, useEffect } from 'react';
import getMoonPhase from '../routes/api/moonPhase';

const MoonPhaseDisplay = () => {
  const [moonPhase, setMoonPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoonPhase = async () => {
      try {
        const data = await getMoonPhase();
        setMoonPhase(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch moon phase');
        setLoading(false);
      }
    };

    fetchMoonPhase();
  }, []);

  if (loading) return <div>Loading moon phase...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Current Moon Phase</h2>
      <p>Phase: {moonPhase.phase}</p>
      <p>Illumination: {moonPhase.illumination * 100}%</p>
    </div>
  );
};

export default MoonPhaseDisplay;