import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center h-full items-center">
      <Link
        to="/dancers"
        className="border-4 border-r-2 border-emerald-700 bg-emerald-50 hover:bg-emerald-500 hover:text-white p-4 rounded-l-full text-3xl text-nowrap"
      >
        Dancers
      </Link>
      <Link
        to="/dance-events"
        className="border-4 border-l-2 border-emerald-700 bg-emerald-50 hover:bg-emerald-500 hover:text-white p-4 rounded-r-full text-3xl text-nowrap"
      >
        Dance Events
      </Link>
    </div>
  );
};

export default Home;
