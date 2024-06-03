import { useState } from 'react';
import axios from 'axios';

const CreateDanceEvent = () => {
  const [formValues, setFormValues] = useState({
    eventName: '',
    location: '',
    danceStyles: [],
    attendees: [],
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const data = {
    eventName: formValues.eventName,
    location: formValues.location,
    danceStyles: formValues.danceStyles,
    attendees: formValues.attendees,
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:5555/dance-events', data)
      .then((response) => console.log(response));
  };

  console.log('formValues:', formValues);

  return (
    <div>
      <h1 className="font-bold py-4">CreateDanceEvent</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="eventName">Event name:</label>
        <input
          id="eventName"
          type="text"
          placeholder="Holding the place"
          className="bg-emerald-50 p-4 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          placeholder="Holding the place"
          className="bg-emerald-50 p-4 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="danceStyles">DanceStyles:</label>
        <input
          id="danceStyles"
          type="text"
          placeholder="Holding the place"
          className="bg-emerald-50 p-4 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="attendees">Attendees:</label>
        <input
          id="attendees"
          type="text"
          placeholder="Holding the place"
          className="bg-emerald-50 p-4 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateDanceEvent;
