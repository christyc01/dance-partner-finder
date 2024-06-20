import axios from 'axios';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import DanceEventModal from '../components/home/DanceEventModal';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { GiBallerinaShoes } from 'react-icons/gi';

const DanceEventsHome = () => {
  const [danceEventData, setDanceEventData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  // Get the main dance event data for the cards
  useEffect(() => {
    const getDanceEventData = () => {
      setLoading(true);
      axios
        .get('http://localhost:5555/dance-events')
        .then((response) => {
          setDanceEventData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    getDanceEventData();
  }, []);

  const handleEventClick = () => {
    setShowModal(true);
  };

  return (
    <div className="md:p-4 bg-white shadow-lg md:rounded-lg">
      <BackButton />
      <div className="flex flex-col w-full items-center">
        <div className="w-full xl:w-3/4">
          <h1 className="text-2xl font-bold mb-2 text-emerald-600">
            Dance Events
          </h1>

          {loading ? (
            <Spinner />
          ) : (
            <div>
              <div className="flex justify-end mb-4">
                <Link to="/dance-events/create">
                  <MdOutlineAddBox className="text-emerald-800 text-4xl" />
                </Link>
              </div>
              <div className="p-0 mt-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-8">
                {danceEventData.data &&
                  danceEventData.data.map((event) => (
                    <div
                      key={event._id}
                      className="p-6 md:rounded-lg bg-emerald-100 hover:bg-emerald-200 hover:cursor-pointer"
                      onClick={() => {
                        handleEventClick();
                        setSelectedEvent(event);
                      }}
                    >
                      <p className="mb-6 text-lg font-bold leading-6">
                        {event.eventName}
                      </p>
                      <div className="flex gap-x-2 pb-4">
                        <GrLocation className="text-black-300 text-2xl" />
                        <p className="font-bold">{event.location}</p>
                      </div>
                      <p className="line-clamp-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni quia voluptatum sint. Nisi impedit libero eveniet
                        cum vitae qui expedita necessitatibus assumenda
                        laboriosam, facilis iste cumque a pariatur nesciunt
                        cupiditate voluptas? Quis atque earum voluptate dolor
                        nisi dolorum est? Deserunt placeat cumque quo dicta
                        architecto, dolore vitae voluptate sequi repellat
                      </p>
                      {event.danceStyles.length > 0 && (
                        <div className="mt-8">
                          <div className="flex gap-x-2">
                            <GiBallerinaShoes className="text-black-300 text-2xl" />
                            <p className="font-bold mb-2">Dance styles:</p>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {event.danceStyles.map((danceStyle) => (
                              <p
                                key={danceStyle}
                                className="w-fit bg-emerald-500 text-white rounded-full px-3 py-1"
                              >
                                {danceStyle}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              {showModal && (
                <DanceEventModal
                  danceEvent={selectedEvent}
                  setDanceEventData={setDanceEventData}
                  closeModal={() => setShowModal(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DanceEventsHome;
