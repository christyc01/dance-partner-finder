import { useState } from 'react';

const CreateDanceEvent = () => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  console.log('formValues:', formValues);

  return (
    <div>
      <h1 className="font-bold py-4">CreateDanceEvent</h1>
      <form action="submit" className="flex flex-col">
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
      </form>
    </div>
  );
};

export default CreateDanceEvent;
