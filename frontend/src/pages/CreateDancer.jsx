import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const CreateDancer = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    danceStyles: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const danceStyleOptions = [
    'tango',
    'waltz',
    'foxtrot',
    'bachata',
    'salsa',
    'swing',
  ].sort();

  const createDancer = (e) => {
    e.preventDefault();

    const data = {
      name: formValues.name,
      location: formValues.location,
      danceStyles: formValues.danceStyles,
    };

    setLoading(true);

    axios
      .post('http://localhost:5555/dancers', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Successfully created a dancer!', {
          variant: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred - check the console.', {
          variant: 'error',
        });
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const updatedValues = {
      ...formValues,
      [e.target.id]: e.target.value,
    };
    setFormValues(updatedValues);
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

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col w-full items-center">
        <div className="w-96">
          <h1 className="text-2xl font-bold mb-2 text-green-600">
            Create Dancer
          </h1>
          <form
            onSubmit={createDancer}
            className="flex flex-col border-2  bg-green-200 border-green-300 rounded-md p-6"
          >
            <div className="my-4">
              <label
                htmlFor="name"
                className="text-xl mr-4 text-green-600 font-bold"
              >
                Name:
              </label>
              <input
                id="name"
                placeholder="Enter name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                className="border-2 border-green-200 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="location"
                className="text-xl mr-4 text-green-600 font-bold"
              >
                Location:
              </label>
              <input
                id="location"
                placeholder="Enter location"
                type="text"
                value={formValues.location}
                onChange={handleChange}
                className="border-2 border-green-200 px-4 py-2 w-full"
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="location"
                className="text-xl mr-4 text-green-600 font-bold"
              >
                Select dance styles:
              </label>
              {danceStyleOptions.map((danceStyleOption) => (
                <div key={danceStyleOption} className="my-6">
                  <input
                    id={danceStyleOption}
                    type="checkbox"
                    value={danceStyleOption}
                    onChange={handleCheckboxChange}
                    className="hidden peer/draft"
                  />
                  <label
                    htmlFor={danceStyleOption}
                    className="text-xl mr-4 py-2 px-4 rounded-full transition-colors border-2 border-green-500 text-green-600 peer-checked/draft:bg-green-500 peer-checked/draft:text-white"
                  >
                    {danceStyleOption.slice(0, 1).toUpperCase()}
                    {danceStyleOption.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="p-2 bg-green-500 text-white m-8 rounded-full transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDancer;
