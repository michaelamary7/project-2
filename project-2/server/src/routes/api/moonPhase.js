
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://moon-phase.p.rapidapi.com/basic',
  headers: {
    'x-rapidapi-key': 'your-rapidapi-key',
    'x-rapidapi-host': 'moon-phase.p.rapidapi.com'
  }
};

const getMoonPhase = async () => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch moon phase');
  }
};

export default getMoonPhase;