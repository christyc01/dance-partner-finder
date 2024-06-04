import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const DeleteDancer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/dancers/${id}`)
      .then(() => {
        enqueueSnackbar('Successfully deleted', { variant: 'success' });
        navigate('/dancers');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('An error occurred - check the console.', {
          variant: 'error',
        });
        setLoading(false);
      });
  };

  return (
    <div className="md:p-4 bg-white shadow-lg md:rounded-lg">
      <BackButton />
      <div className="flex flex-col w-full items-center">
        <div className="w-full md:w-96">
          <h1 className="text-2xl font-bold mb-2 text-emerald-600">
            Delete Dancer
          </h1>
          {loading ? <Spinner /> : ''}
          <div className="flex flex-col md:border-2  bg-emerald-200 border-emerald-300 md:rounded-xl p-6">
            <h3 className="text-2xl text-emerald-600 font-bold">
              Are you sure?
            </h3>

            <button
              className="p-2 bg-emerald-800 text-white m-8 rounded-xl transition-colors"
              onClick={handleDelete}
            >
              Yep, delete them
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDancer;
