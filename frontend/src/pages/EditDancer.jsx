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
    <div className="md:p-4 bg-white shadow-lg md:rounded-lg">
      <BackButton />
      <div className="flex flex-col w-full items-center">
        <div className="w-full md:w-96">
          <h1 className="text-2xl font-bold mb-2 text-emerald-600">
            Edit Dancer
          </h1>
          {loading ? <Spinner /> : ''}
          <form
            onSubmit={handleEditDancer}
            className="flex flex-col md:border-2  bg-emerald-200 border-emerald-300 md:rounded-xl p-6"
          >
            <div className="my-4">
              <label
                htmlFor="name"
                className="text-xl mr-4 text-emerald-600 font-bold"
              >
                Name:{' '}
              </label>
              <input
                type="text"
                id="name"
                value={formValues.name}
                onChange={handleChange}
                className="border-2 border-emerald-200 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="location"
                className="text-xl mr-4 text-emerald-600 font-bold"
              >
                Location:{' '}
              </label>
              <input
                type="text"
                id="location"
                value={formValues.location}
                onChange={handleChange}
                className="border-2 border-emerald-200 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="danceStyles"
                className="text-xl mr-4 text-emerald-600 font-bold"
              >
                Dance styles:{' '}
              </label>
              {danceStyleOptions.map((danceStyleOption) => (
                <div key={danceStyleOption} className="my-6">
                  <input
                    id={danceStyleOption}
                    type="checkbox"
                    value={danceStyleOption}
                    onChange={handleCheckboxChange}
                    checked={formValues.danceStyles.includes(danceStyleOption)}
                    className="hidden peer/checkedField"
                  />
                  <label
                    htmlFor={danceStyleOption}
                    className="text-xl mr-4 py-2 px-4 rounded-full transition-colors border-2 border-emerald-500 text-emerald-600 peer-checked/checkedField:bg-emerald-500 peer-checked/checkedField:text-white"
                  >
                    {danceStyleOption.slice(0, 1).toUpperCase()}
                    {danceStyleOption.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="p-2 bg-emerald-800 text-white m-8 rounded-xl transition-colors"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDancer;
