import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
import DancersCard from '../components/home/DancersCard';
import DancersTable from '../components/home/DancersTable';
import AdminToggle from '../components/AdminToggle';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('table');
  const [showOperations, setShowOperations] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // Example using try/catch
      // try {
      //   const response = await fetch('http://localhost:5555/dancers');
      //   const parsedResponse = await response.json();
      //   setData(parsedResponse);
      // } catch (error) {
      //   console.error('Failed to fetch:', error);
      // }

      // Example using .then()
      // fetch('http://localhost:5555/dancers')
      //   .then((res) => res.json())
      //   .then((parsedRes) => setData(parsedRes));

      // Example using Axios
      axios
        .get('http://localhost:5555/dancers')
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="p-0 md:p-4">
      <div className="flex flex-col justify-center items-center gap-y-2">
        <AdminToggle
          showOperations={showOperations}
          setShowOperations={setShowOperations}
        />
        <div className="w-full max-w-64">
          <button
            onClick={() => setView('table')}
            className={`w-1/2 hover:bg-emerald-500 px-4 py-1 rounded-l-full ${
              view === 'table' ? 'bg-emerald-500' : 'bg-emerald-300'
            } `}
          >
            Table View
          </button>
          <button
            onClick={() => setView('card')}
            className={`w-1/2 hover:bg-emerald-500 px-4 py-1 rounded-r-full ${
              view === 'card' ? 'bg-emerald-500' : 'bg-emerald-300'
            }`}
          >
            Card View
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mx-4">
        <h1 className="text-3xl my-8">Dancers</h1>
        <Link to="/dancers/create">
          <MdOutlineAddBox className="text-emerald-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : view === 'card' ? (
        <DancersCard data={data} showOperations={showOperations} />
      ) : (
        <DancersTable data={data} showOperations={showOperations} />
      )}
    </div>
  );
};

export default Home;
