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

  return (
    <div className="md:p-4 bg-white shadow-lg md:rounded-lg">
      <BackButton />
      <div className="flex flex-col w-full items-center">
        <div className="w-full md:w-96">
          <h1 className="text-2xl font-bold mb-2 text-emerald-600">
            Show Dancer
          </h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col md:border-2 bg-emerald-200 border-emerald-300 md:rounded-xl p-6">
              <div className="my-4">
                <span className="text-xl mr-4 text-emerald-600 font-bold">
                  Id
                </span>
                <span>{dancer._id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-emerald-600 font-bold">
                  Name
                </span>
                <span>{dancer.name}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-emerald-600 font-bold">
                  Location
                </span>
                <span>{dancer.location}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-emerald-600 font-bold">
                  Dance styles
                </span>
                <span className="flex flex-wrap gap-3 mt-2">
                  {dancer?.danceStyles?.map((danceStyle) => (
                    <div
                      key={danceStyle}
                      className="text-xl mr-4 px-3 py-1 rounded-full transition-colors bg-emerald-500 text-white"
                    >
                      {danceStyle}
                    </div>
                  ))}
                </span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-emerald-600 font-bold">
                  Create Time
                </span>
                <span>{new Date(dancer.createdAt).toString()}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-emerald-600 font-bold">
                  Last Update Time
                </span>
                <span>{new Date(dancer.updatedAt).toString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowDancer;
