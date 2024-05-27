import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center h-full items-center">
      <Link to="/dancers" className="bg-orange-500 p-4 rounded-l-full">
        Dancers
      </Link>
      <Link to="/dance-events" className="bg-yellow-500 p-4 rounded-r-full">
        Dance Events
      </Link>
    </div>
  );
};

export default Home;
