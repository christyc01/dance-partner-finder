import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { danceStyleOptions } from '../utils/danceStyleOptions';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import { GiBallerinaShoes } from 'react-icons/gi';

const EditDanceEvent = () => {
  const [formValues, setFormValues] = useState({
    eventName: '',
    location: '',
    danceStyles: [],
    attendees: [],
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleEditDanceEvent = () => {
    console.log('editing dance event');
  };

  const handleChange = () => {
    console.log('handling change');
  };

  const handleCheckboxChange = () => {
    console.log('handling checkbox change');
  };

  const closeModal = () => {
    console.log('closeModal');
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5555/dance-events/${id}`)
        .then((response) => {
          setFormValues(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert('An error happened. Please check console');
          console.log(error);
        });
    };
    fetchData();
    console.log('formValues:', formValues);
  }, []);

  return (
    <div className="md:p-4 bg-white shadow-lg md:rounded-lg">
      <BackButton />
      <div className="flex flex-col w-full items-center">
        <div className="w-full md:w-96">
          <h1 className="text-2xl font-bold mb-2 text-emerald-600">
            Edit Dance Event
          </h1>
          {loading ? <Spinner /> : ''}
          {/* <form
            onSubmit={handleEditDanceEvent}
            className="flex flex-col md:border-2  bg-emerald-200 border-emerald-300 md:rounded-xl p-6"
          >
            <div className="my-4">
              <label
                htmlFor="name"
                className="text-xl mr-4 text-emerald-600 font-bold"
              >
                Name:{' '}
              </label>
              <input
                type="text"
                id="name"
                value={formValues.name}
                onChange={handleChange}
                className="border-2 border-emerald-200 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="location"
                className="text-xl mr-4 text-emerald-600 font-bold"
              >
                Location:{' '}
              </label>
              <input
                type="text"
                id="location"
                value={formValues.location}
                onChange={handleChange}
                className="border-2 border-emerald-200 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="danceStyles"
                className="text-xl mr-4 text-emerald-600 font-bold"
              >
                Dance styles:{' '}
              </label>
              {danceStyleOptions.map((danceStyleOption) => (
                <div key={danceStyleOption} className="my-6">
                  <input
                    id={danceStyleOption}
                    type="checkbox"
                    value={danceStyleOption}
                    onChange={handleCheckboxChange}
                    checked={formValues.danceStyles.includes(danceStyleOption)}
                    className="hidden peer/checkedField"
                  />
                  <label
                    htmlFor={danceStyleOption}
                    className="text-xl mr-4 py-2 px-4 rounded-full transition-colors border-2 border-emerald-500 text-emerald-600 peer-checked/checkedField:bg-emerald-500 peer-checked/checkedField:text-white"
                  >
                    {danceStyleOption.slice(0, 1).toUpperCase()}
                    {danceStyleOption.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="p-2 bg-emerald-800 text-white m-8 rounded-xl transition-colors"
            >
              Edit
            </button>
          </form> */}
        </div>
      </div>

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
              <h2 className="my-1">{formValues.eventName}</h2>
            </div>
            <div className="flex flex-col justify-start items-left font-bold">
              <div className="flex gap-x-2">
                <GrLocation className="text-black text-2xl" />
                <h2 className="my-1">{formValues.location}</h2>
              </div>
              {/* {!loading && (
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
              )} */}
            </div>
            {formValues.danceStyles.length > 0 && (
              <div className="flex flex-col">
                <div className="flex justify-start items-center gap-x-2 font-bold">
                  <GiBallerinaShoes className="text-black text-2xl" />

                  <h2 className="font-bold">Dance styles:</h2>
                </div>
                <div className="w-fit py-1 flex flex-wrap">
                  {formValues?.danceStyles?.map((danceStyle) => (
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
                expedita necessitatibus assumenda laboriosam, facilis iste
                cumque a pariatur nesciunt cupiditate voluptas? Quis atque earum
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
                  {formValues.attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="bg-emerald-500 text-white rounded-full p-3 m-3"
                    >
                      {attendee}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-4 mt-4 p-4">
            {/* <Link to={`/dance-events/edit/${formValues._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600" />
            </Link>
            <Link to={`/dance-events/delete/${formValues._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600" />
            </Link> */}
            <button onClick={() => console.log('saved')}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDanceEvent;
