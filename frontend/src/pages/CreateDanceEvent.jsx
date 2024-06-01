import { useState } from 'react';

const CreateDanceEvent = () => {
  const [formValues, setFormValues] = useState({});

  const handleChange = () => {
    setFormValues({ test: 'lalalalala' });
  };

  console.log('formValues:', formValues);

  return (
    <div>
      <h1>CreateDanceEvent</h1>
      <form action="submit">
        <input
          type="text"
          placeholder="hjkhkjhkj"
          className="bg-emerald-50 p-4 rounded-xl"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default CreateDanceEvent;
