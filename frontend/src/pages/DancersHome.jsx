import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
// import DancersCard from '../components/home/DancersCard';
import DancersTable from '../components/home/DancersTable';
import AdminToggle from '../components/AdminToggle';
import ViewToggle from '../components/ViewToggle';
import BackButton from '../components/BackButton';

const DancersHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('table');
  const [showOperations, setShowOperations] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      <div className="flex w-full justify-between">
        <BackButton />
        <AdminToggle
          showOperations={showOperations}
          setShowOperations={setShowOperations}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-y-2 mt-4">
        {/* TODO: Remove card view completely? */}
        {/* <ViewToggle view={view} setView={setView} /> */}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold my-2 text-emerald-600">Dancers</h1>
        <Link to="/dancers/create">
          <MdOutlineAddBox className="text-emerald-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : view === 'card' ? (
        <DancersCard
          data={data}
          showOperations={showOperations}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <DancersTable
          data={data}
          showOperations={showOperations}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default DancersHome;
