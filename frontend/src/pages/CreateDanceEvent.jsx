import { useState } from 'react';

const CreateDanceEvent = () => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    setFormValues({ test: e.target.value });
  };

  console.log('formValues:', formValues);

  return (
    <div>
      <h1>CreateDanceEvent</h1>
      <form action="submit">
        <input
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
