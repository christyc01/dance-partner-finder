import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const ShowDancer = () => {
  const [dancer, setDancer] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const getData = () => {
      axios
        .get(`http://localhost:5555/dancers/${id}`)
        .then((response) => {
          setDancer(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    getData();
  }, []);

  console.log(dancer);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Dancer</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{dancer._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Name</span>
            <span>{dancer.name}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Location</span>
            <span>{dancer.location}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Dance styles</span>
            <span className="flex">
              {dancer?.danceStyles?.map((danceStyle) => (
                <div key={danceStyle._id} className="bg-red-300 p-3 m-3">
                  {danceStyle}
                </div>
              ))}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(dancer.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(dancer.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDancer;
