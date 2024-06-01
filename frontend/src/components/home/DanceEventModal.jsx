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

const DanceEventModal = ({ danceEvent, closeModal }) => {
  const [loading, setLoading] = useState(true);
  const [mapLocation, setMapLocation] = useState(danceEvent.location);
  // const address = '1600 Amphitheatre Parkway, Mountain View, CA';
  // const address = 'Frankfurt, Germany';
  const address = danceEvent.location;

  useEffect(() => {
    setLoading(true);
    const fetchCoordinates = async (address) => {
      try {
        const response = await axios.get(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: address,
              format: 'json',
              addressdetails: 1,
              limit: 1,
            },
          }
        );
        if (
          response.data &&
          response.data.length > 0 &&
          response.data[0] !== null
        ) {
          console.log('response.data:', response.data);
          const { lat, lon } = response.data[0];
          setMapLocation([parseFloat(lat), parseFloat(lon)]);
          setLoading(false);
        } else {
          console.warn('No matching location found for the provided address');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setLoading(false);
      }
    };
    fetchCoordinates(address);
  }, [address]);

  return (
    <div
      className="flex flex-col fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 justify-center items-center"
      onClick={closeModal}
    >
      <div className="bg-white rounded-xl">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[600px] max-w-full p-4 flex flex-col relative"
        >
          <AiOutlineClose
            onClick={closeModal}
            className="absolute right-6 top-6 text-3xl text-emerald-600 cursor-pointer"
          />
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-black text-2xl" />
            <h2 className="my-1">{danceEvent.eventName}</h2>
          </div>
          <div className="flex flex-col justify-start items-center gap-x-2">
            <GrLocation className="text-black-300 text-2xl" />
            <h2 className="my-1">{danceEvent.location}</h2>
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
          <div className="w-fit py-1 flex flex-wrap">
            {danceEvent?.attendees?.map((attendee) => (
              <div
                key={attendee}
                className="bg-emerald-500 text-white rounded-full p-3 m-3"
              >
                {attendee}
              </div>
            ))}
          </div>
          <p className="mt-4">Random details to come...</p>
          <p className="my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
            voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
            necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
            nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
            dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
            vitae voluptate sequi repellat!
          </p>
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
