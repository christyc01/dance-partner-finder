import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const DeleteDanceEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/dance-events/${id}`)
      .then(() => {
        navigate('/dance-events');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col w-full items-center">
        <button
          className="p-2 bg-emerald-800 text-white m-8 rounded-xl transition-colors"
          onClick={handleDelete}
        >
          Delete this event
        </button>
      </div>
    </div>
  );
};

export default DeleteDanceEvent;
