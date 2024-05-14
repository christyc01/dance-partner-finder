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
      console.log('checked value:', [
        ...formValues.danceStyles,
        e.target.value,
      ]);
    } else {
      console.log(
        'non-checked:',
        formValues.danceStyles.filter((option) => option !== e.target.value)
      );
    }
    const updatedCheckboxValues = {
      danceStyles: [...formValues.danceStyles, e.target.value],
    };
    console.log('updatedCheckboxValues:', updatedCheckboxValues);
    setFormValues({ ...formValues, ...updatedCheckboxValues });
  };

  return (
    <div className="p-4">
      <BackButton />
      {loading ? <Spinner /> : ''}
      <h1 className="text-3xl my-4">Create Dancer</h1>
      <form
        onSubmit={createDancer}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
      >
        <div className="my-4">
          <label htmlFor="name" className="text-xl mr-4 text-gray-500">
            Name:
          </label>
          <input
            id="name"
            placeholder="Enter name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="location" className="text-xl mr-4 text-gray-500">
            Location:
          </label>
          <input
            id="location"
            placeholder="Enter location"
            type="text"
            value={formValues.location}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <input
            id="salsa"
            type="checkbox"
            value={'salsa'}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="salsa" className="text-xl mr-4 text-gray-500">
            Salsa
          </label>

          <input
            id="bachata"
            type="checkbox"
            value={'bachata'}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="bachata" className="text-xl mr-4 text-gray-500">
            Bachata
          </label>
        </div>
        <button type="submit" className="p-2 bg-sky-300 m-8">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDancer;
