import axios from 'axios';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import DanceEventModal from '../components/home/DanceEventModal';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';

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
            Show Dance Event
          </h1>

          {loading ? (
            <Spinner />
          ) : (
            <div>
              <div>
                <Link to="/dance-events/create">
                  <MdOutlineAddBox className="text-emerald-800 text-4xl" />
                </Link>
              </div>
              <div className="p-0 md:p-4 mt-2 grid lg:grid-cols-3 xl:grid-cols-4 justify-center">
                {danceEventData.data &&
                  danceEventData.data.map((event) => (
                    <div
                      key={event._id}
                      className="border-2 border-emerald-500 m-4 p-4 rounded-lg bg-emerald-50"
                      onClick={() => {
                        handleEventClick();
                        setSelectedEvent(event);
                      }}
                    >
                      <div className="flex gap-4 pb-4">
                        <GrLocation className="text-black-300 text-2xl" />
                        <p>{event.location}</p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni quia voluptatum sint. Nisi impedit libero eveniet
                        cum vitae qui expedita necessitatibus assumenda
                        laboriosam, facilis iste cumque a pariatur nesciunt
                        cupiditate voluptas? Quis atque earum voluptate dolor
                        nisi dolorum est? Deserunt placeat cumque quo dicta
                        architecto, dolore vitae voluptate sequi repellat
                      </p>
                      {event.danceStyles.length > 0 && (
                        <div className="w-fit bg-emerald-500 text-white rounded-full p-3 m-3">
                          {event.danceStyles}
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
