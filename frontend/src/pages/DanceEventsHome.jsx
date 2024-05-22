import axios from 'axios';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const DanceEventsHome = () => {
  const [danceEventData, setDanceEventData] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleAttendeeComingClick = (id) => {
    console.log('clicked', id);
    axios
      .put(`http://localhost:5555/dance-events/${id}`, {
        attendees: danceEventData.attendees,
      })
      .then(() => {
        axios
          .get(`http://localhost:5555/dance-events/${id}`)
          .then((response) => {
            setDanceEventData((prevData) => ({
              ...prevData,
              data: prevData.data.map((event) =>
                event._id === id ? response.data : event
              ),
            }));
          });
      });
  };

  const handleAttendeeComingChange = (name) => {
    console.log('name is:', name);
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
            <div className="p-0 md:p-4 mt-2 grid lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {danceEventData.data &&
                danceEventData.data.map((event) => (
                  <div
                    key={event._id}
                    className="border-2 border-emerald-500 m-4 p-4 rounded-lg bg-emerald-50"
                  >
                    <p className="font-bold">{event.eventName}</p>
                    <ul className="list-disc pl-8">
                      <li>{event.location}</li>
                      <li>{event.danceStyles}</li>
                    </ul>
                    <div className="flex justify-between mt-4">
                      <div>
                        <p>Attendees:</p>
                        <ul className="list-disc pl-8">
                          {event.attendees.map((attendee) => (
                            <li key={attendee}>{attendee}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <form>
                          <label htmlFor="attendeeName"></label>
                          <input
                            id="attendeeName"
                            type="text"
                            className="bg-green-400"
                            onChange={(e) =>
                              handleAttendeeComingChange(e.target.value)
                            }
                          />
                          <button
                            type="submit"
                            onClick={() => handleAttendeeComingClick(event._id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded-full"
                          >
                            I&apos;m coming!
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DanceEventsHome;
