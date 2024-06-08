/* eslint-disable react/prop-types */
import axios from 'axios';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import { GiBallerinaShoes } from 'react-icons/gi';

const DanceEventModal = ({ danceEvent, setDanceEventData, closeModal }) => {
  const [loading, setLoading] = useState(true);
  const [attendees, setAttendees] = useState({});
  const [attendeeArray, setAttendeeArray] = useState([]);
  const [mapLocation, setMapLocation] = useState(danceEvent.location);
  // const address = '1600 Amphitheatre Parkway, Mountain View, CA';
  // const address = 'Frankfurt, Germany';
  const address = danceEvent.location;

  const handleAttendeeComingClick = async (event, id) => {
    event.preventDefault();

    const updatedAttendees = [...danceEvent.attendees, attendees[id]];

    const data = {
      eventName: danceEvent.eventName,
      location: danceEvent.location,
      danceStyles: danceEvent.danceStyles,
      attendees: updatedAttendees,
    };

    axios.put(`http://localhost:5555/dance-events/${id}`, data).then(() => {
      axios.get(`http://localhost:5555/dance-events/${id}`).then((response) => {
        setDanceEventData((prevData) => ({
          ...prevData,
          data: prevData.data.map((event) =>
            event._id === id ? { ...event, ...response.data } : event
          ),
        }));
        setAttendeeArray((prevArray) => [...prevArray, attendees[id]]);
        setAttendees((prev) => ({ ...prev, [id]: '' }));
        console.log('attendeeArray:', attendeeArray);
        console.log('attendees:', attendees);
        console.log('attendees[id]:', attendees[id]);
      });
    });
  };

  // Set newAttendee to the name from the input field
  const handleAttendeeComingChange = (id, value) => {
    setAttendees((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    setAttendeeArray(danceEvent.attendees);
  }, [danceEvent.attendees]);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchCoordinates = async (address) => {
  //     try {
  //       const response = await axios.get(
  //         'https://nominatim.openstreetmap.org/search',
  //         {
  //           params: {
  //             q: address,
  //             format: 'json',
  //             addressdetails: 1,
  //             limit: 1,
  //           },
  //         }
  //       );
  //       if (
  //         response.data &&
  //         response.data.length > 0 &&
  //         response.data[0] !== null
  //       ) {
  //         console.log('response.data:', response.data);
  //         const { lat, lon } = response.data[0];
  //         setMapLocation([parseFloat(lat), parseFloat(lon)]);
  //         setLoading(false);
  //       } else {
  //         console.warn('No matching location found for the provided address');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching coordinates:', error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchCoordinates(address);
  // }, [address]);

  return (
    <div
      className="flex flex-col fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 justify-center items-center"
      onClick={closeModal}
    >
      <div className="bg-white rounded-xl overflow-auto my-4 md:w-[600px] xl:w-[1000px]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-full p-4 flex flex-col relative"
        >
          <AiOutlineClose
            onClick={closeModal}
            className="absolute right-6 top-6 text-3xl text-emerald-600 cursor-pointer"
          />
          <div className="flex justify-start items-center font-bold pb-4">
            <h2 className="my-1">{danceEvent.eventName}</h2>
          </div>
          <div className="flex flex-col justify-start items-left font-bold">
            <div className="flex gap-x-2">
              <GrLocation className="text-black text-2xl" />
              <h2 className="my-1">{danceEvent.location}</h2>
            </div>
            {!loading && (
              <MapContainer
                center={mapLocation}
                zoom={13}
                className="h-36 lg:h-64 w-full z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={mapLocation}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
          {danceEvent.danceStyles.length > 0 && (
            <div className="flex flex-col">
              <div className="flex justify-start items-center gap-x-2 font-bold">
                <GiBallerinaShoes className="text-black text-2xl" />

                <h2 className="font-bold">Dance styles:</h2>
              </div>
              <div className="w-fit py-1 flex flex-wrap">
                {danceEvent?.danceStyles?.map((danceStyle) => (
                  <div
                    key={danceStyle}
                    className="bg-emerald-500 text-white rounded-full p-3 m-3"
                  >
                    {danceStyle}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="py-4">
            <p className="mt-4">Random details to come...</p>
            <p className="my-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              quia voluptatum sint. Nisi impedit libero eveniet cum vitae qui
              expedita necessitatibus assumenda laboriosam, facilis iste cumque
              a pariatur nesciunt cupiditate voluptas? Quis atque earum
              voluptate dolor nisi dolorum est? Deserunt placeat cumque quo
              dicta architecto, dolore vitae voluptate sequi repellat!
            </p>
          </div>
          <div>
            <div className="flex flex-col">
              <div className="flex justify-start items-center gap-x-2 font-bold">
                <BiUserCircle className="text-black text-2xl" />
                <h2 className="font-bold">Attendees:</h2>
              </div>
              <div className="w-fit py-1 flex flex-wrap">
                {attendeeArray.map((attendee, index) => (
                  <div
                    key={index}
                    className="bg-emerald-500 text-white rounded-full p-3 m-3"
                  >
                    {attendee}
                  </div>
                ))}
              </div>
            </div>
            <form
              onSubmit={(e) => handleAttendeeComingClick(e, danceEvent._id)}
              onClick={(e) => e.stopPropagation()}
            >
              <label htmlFor="attendeeName"></label>
              <input
                id="attendeeName"
                type="text"
                className="bg-gray-100 p-2 mr-4 rounded-lg"
                placeholder="Name"
                value={attendees[danceEvent._id] || ''}
                onChange={(e) =>
                  handleAttendeeComingChange(danceEvent._id, e.target.value)
                }
              />
              <button
                type="submit"
                className={`bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded-full disabled:bg-gray-400`}
                disabled={
                  !attendees[danceEvent._id] || attendees[danceEvent._id] === ''
                }
              >
                I&apos;m coming!
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-4 mt-4 p-4">
          <Link to={`/dance-events/edit/${danceEvent._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600" />
          </Link>
          <Link to={`/dance-events/delete/${danceEvent._id}`}>
            <MdOutlineDelete className="text-2xl text-red-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DanceEventModal;
