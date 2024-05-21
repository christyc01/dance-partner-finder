import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowDanceEvent = () => {
  const [danceEventData, setDanceEventData] = useState({});

  useEffect(() => {
    const getDanceEventData = () => {
      axios
        .get('http://localhost:5555/dance-events')
        .then((response) => setDanceEventData(response))
        .catch((error) => {
          console.log(error);
        });
    };
    getDanceEventData();
  }, []);

  console.log('eventData:', danceEventData);

  return (
    <div>
      <h1>ShowDanceEvent</h1>
      <p>{danceEventData.data.data[0].eventName}</p>
    </div>
  );
};

export default ShowDanceEvent;
