import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteDanceEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log('deleting...', id);
    axios
      .delete(`http://localhost:5555/dance-events/${id}`)
      .then(navigate('/'))
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h1>DeleteDanceEvent</h1>
      <button onClick={handleDelete}>Delete me</button>
    </div>
  );
};

export default DeleteDanceEvent;
