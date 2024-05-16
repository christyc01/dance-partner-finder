import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
        navigate('/');
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
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <BackButton />
      <div className="flex flex-col w-full items-center">
        <div className="w-96">
          <h1 className="text-2xl font-bold mb-2 text-green-600">
            Delete Dancer
          </h1>
          {loading ? <Spinner /> : ''}
          <div className="flex flex-col items-center border-2 border-green-500 rounded-xl w-[600px] p-8 mx-auto">
            <h3 className="text-2xl text-green-600">Are you sure?</h3>

            <button
              className="p-4 bg-green-800 text-white m-8 w-full rounded-md"
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
