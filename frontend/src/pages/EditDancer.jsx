import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditDancer = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    danceStyles: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const danceStyleOptions = [
    'tango',
    'waltz',
    'foxtrot',
    'bachata',
    'salsa',
    'swing',
  ].sort();

  const handleEditDancer = (e) => {
    e.preventDefault();

    const data = {
      name: formValues.name,
      location: formValues.location,
      danceStyles: formValues.danceStyles,
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/dancers/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Successfully edited the dancer!', {
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

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5555/dancers/${id}`)
        .then((response) => {
          setFormValues(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert('An error happened. Please check console');
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Dancer</h1>
      {loading ? <Spinner /> : ''}
      <form
        onSubmit={handleEditDancer}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
      >
        <div className="my-4">
          <label htmlFor="name" className="text-xl mr-4 text-gray-500">
            Name:{' '}
          </label>
          <input
            type="text"
            id="name"
            value={formValues.name}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="location" className="text-xl mr-4 text-gray-500">
            Location:{' '}
          </label>
          <input
            type="text"
            id="location"
            value={formValues.location}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="danceStyles" className="text-xl mr-4 text-gray-500">
            Dance styles:{' '}
          </label>
          {danceStyleOptions.map((danceStyleOption) => (
            <div key={danceStyleOption}>
              <input
                id={danceStyleOption}
                type="checkbox"
                value={danceStyleOption}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor={danceStyleOption}
                className="text-xl mr-4 text-gray-500"
              >
                {danceStyleOption.slice(0, 1).toUpperCase()}
                {danceStyleOption.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="p-2 bg-sky-300 m-8">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditDancer;
