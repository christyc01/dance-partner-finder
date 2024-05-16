import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BackButton = ({ destination = '/' }) => {
  return (
    <div className="flex">
      <Link
        to={`http://localhost:5174${destination}`}
        className="bg-emerald-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
