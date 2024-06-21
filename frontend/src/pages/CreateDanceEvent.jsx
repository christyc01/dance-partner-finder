import axios from 'axios';
import { useState } from 'react';
import { danceStyleOptions } from '../utils/danceStyleOptions';
import { useNavigate } from 'react-router-dom';

const CreateDanceEvent = () => {
  const [formValues, setFormValues] = useState({
    eventName: '',
    location: '',
    danceStyles: [],
    attendees: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormValues({
        ...formValues,
        danceStyles: [...formValues.danceStyles, e.target.value].sort(),
      });
    } else {
      setFormValues({
        ...formValues,
        danceStyles: formValues.danceStyles
          .filter((danceStyle) => danceStyle !== e.target.value)
          .sort(),
      });
    }
  };

  const data = {
    eventName: formValues.eventName,
    location: formValues.location,
    danceStyles: formValues.danceStyles,
    attendees: formValues.attendees,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5555/dance-events', data).then((response) => {
      console.log(response);
      navigate('/dance-events');
    });
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
        <div className="my-4">
          <label
            htmlFor="location"
            className="text-xl mr-4 text-emerald-600 font-bold"
          >
            Select dance styles:
          </label>
          {danceStyleOptions.map((danceStyleOption) => (
            <div key={danceStyleOption} className="my-6 gap-3">
              <input
                id={danceStyleOption}
                type="checkbox"
                value={danceStyleOption}
                onChange={handleCheckboxChange}
                className="hidden peer/checkedField"
              />
              <label
                htmlFor={danceStyleOption}
                className="text-xl mr-4 px-3 py-1 rounded-full transition-colors border-2 border-emerald-500 text-emerald-600 peer-checked/checkedField:bg-emerald-500 peer-checked/checkedField:text-white"
              >
                {danceStyleOption.slice(0, 1).toUpperCase()}
                {danceStyleOption.slice(1)}
              </label>
            </div>
          ))}
        </div>
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
