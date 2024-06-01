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
        navigate('/');
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
      <h1>DeleteDanceEvent</h1>
      <button onClick={handleDelete}>Delete me</button>
    </div>
  );
};

export default DeleteDanceEvent;
