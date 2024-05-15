/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const DancersTable = ({ data }) => {
  const [dataToShow, setDataToShow] = useState(data);
  const [locationToShow, setLocationToShow] = useState();
  const [allUniqueLocationsArray, setAllUniqueLocationsArray] = useState([]);
  const [danceStyleToShow, setDanceStyleToShow] = useState();
  const [allUniqueDanceStylesArray, setAllUniqueDanceStylesArray] = useState(
    []
  );

  // Get all & unique locations
  useEffect(() => {
    const allLocations = data.map((dancer) => dancer.location);
    const uniqueLocations = allLocations.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    setAllUniqueLocationsArray(uniqueLocations);
  }, [data]);

  // Get all & unique dance styles
  useEffect(() => {
    const allDanceStyles = data.flatMap((dancer) => dancer.danceStyles || []);
    const uniqueDanceStyles = allDanceStyles.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    setAllUniqueDanceStylesArray(uniqueDanceStyles);
  }, [data]);

  // Set data to show based on filtered locations/dance styles
  useEffect(() => {
    console.log('Set data to show based on filtered locations/dance styles');
    let filteredData = data;
    if (locationToShow) {
      console.log('location to show');
      filteredData = filteredData.filter(
        (item) => item.location === locationToShow
      );
      console.log('filteredData:', filteredData);
    }
    if (danceStyleToShow) {
      console.log('dance style to show');
      filteredData = filteredData.filter((item) =>
        item.danceStyles.includes(danceStyleToShow)
      );
      console.log('filteredData:', filteredData);
    }
    setDataToShow(filteredData);
  }, [locationToShow, danceStyleToShow, data]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-6">
        <div className="bg-white shadow-lg p-4 rounded-lg w-full mr-4">
          <h3 className="text-xl font-semibold mb-2 text-green-600">
            Filter by Location
          </h3>
          <div className="flex flex-wrap gap-2">
            <p
              onClick={() => {
                setLocationToShow('');
              }}
              className={`py-2 px-4 rounded-full ${
                !locationToShow && 'bg-pink-500'
              }`}
            >
              View all dancers (locations)
            </p>
            {allUniqueLocationsArray &&
              allUniqueLocationsArray.map((uniqueLocation) => (
                <p
                  key={uniqueLocation}
                  onClick={() => {
                    setLocationToShow(uniqueLocation);
                  }}
                  className={`py-2 px-4 rounded-full ${
                    uniqueLocation === locationToShow && 'bg-pink-500'
                  }`}
                >
                  View {uniqueLocation} dancers
                </p>
              ))}
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg w-full ml-4">
          <h3 className="text-xl font-semibold mb-2 text-green-600">
            Filter by Dance Style
          </h3>
          <div className="flex flex-wrap gap-2">
            <p
              onClick={() => {
                setDanceStyleToShow('');
              }}
              className={`py-2 px-4 rounded-full ${
                !danceStyleToShow && 'bg-pink-500'
              }`}
            >
              View all dancers (dance styles)
            </p>
            {allUniqueDanceStylesArray &&
              allUniqueDanceStylesArray.map((uniqueDanceStyle) => (
                <p
                  key={uniqueDanceStyle}
                  onClick={() => {
                    setDanceStyleToShow(uniqueDanceStyle);
                  }}
                  className={`py-2 px-4 rounded-full ${
                    uniqueDanceStyle === danceStyleToShow && 'bg-pink-500'
                  }`}
                >
                  View {uniqueDanceStyle} dancers
                </p>
              ))}
          </div>
        </div>
      </div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Name</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Location
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Dance Styles
            </th>
            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((dancer, index) => (
            <tr key={dancer._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td>{dancer.name}</td>
              <td>{dancer.location}</td>
              <td>
                <div className="flex">
                  {dancer?.danceStyles?.map((danceStyle) => (
                    <div key={danceStyle} className="bg-red-300 p-3 m-3">
                      {danceStyle}
                    </div>
                  ))}
                </div>
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/dancers/details/${dancer._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/dancers/edit/${dancer._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/dancers/delete/${dancer._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DancersTable;
