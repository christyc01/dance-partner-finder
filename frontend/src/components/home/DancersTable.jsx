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
            <button
              onClick={() => {
                setLocationToShow('');
              }}
              className={`py-2 px-4 rounded-full ${
                !locationToShow && 'bg-pink-500'
              }`}
            >
              View all dancers (locations)
            </button>
            {allUniqueLocationsArray &&
              allUniqueLocationsArray.map((uniqueLocation) => (
                <button
                  key={uniqueLocation}
                  onClick={() => {
                    setLocationToShow(uniqueLocation);
                  }}
                  className={`py-2 px-4 rounded-full ${
                    uniqueLocation === locationToShow && 'bg-pink-500'
                  }`}
                >
                  View {uniqueLocation} dancers
                </button>
              ))}
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg w-full ml-4">
          <h3 className="text-xl font-semibold mb-2 text-green-600">
            Filter by Dance Style
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setDanceStyleToShow('');
              }}
              className={`py-2 px-4 rounded-full ${
                !danceStyleToShow && 'bg-pink-500'
              }`}
            >
              View all dancers (dance styles)
            </button>
            {allUniqueDanceStylesArray &&
              allUniqueDanceStylesArray.map((uniqueDanceStyle) => (
                <button
                  key={uniqueDanceStyle}
                  onClick={() => {
                    setDanceStyleToShow(uniqueDanceStyle);
                  }}
                  className={`py-2 px-4 rounded-full ${
                    uniqueDanceStyle === danceStyleToShow && 'bg-pink-500'
                  }`}
                >
                  View {uniqueDanceStyle} dancers
                </button>
              ))}
          </div>
        </div>
      </div>
      <table className="w-full border-separate border-spacing-2 table-fixed">
        <thead>
          <tr className="bg-green-200">
            <th className="border border-green-300 rounded-md p-2 w-1/12">
              No
            </th>
            <th className="border border-green-300 rounded-md p-2 w-3/12">
              Name
            </th>
            <th className="border border-green-300 rounded-md p-2 max-md:hidden w-3/12">
              Location
            </th>
            <th className="border border-green-300 rounded-md p-2 max-md:hidden w-3/12">
              Dance Styles
            </th>
            <th className="border border-green-300 rounded-md p-2 w-2/12">
              Operations
            </th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((dancer, index) => (
            <tr key={dancer._id} className="h-8 bg-green-50">
              <td className="border border-green-200 rounded-md text-center p-2 w-1/12">
                {index + 1}
              </td>
              <td className="border border-green-200 rounded-md p-2 w-3/12">
                {dancer.name}
              </td>
              <td className="border border-green-200 rounded-md p-2 w-3/12">
                {dancer.location}
              </td>
              <td className="border border-green-200 rounded-md p-2 w-3/12">
                <div className="flex flex-wrap gap-2">
                  {dancer?.danceStyles?.map((danceStyle) => (
                    <div
                      key={danceStyle}
                      className="bg-green-300 p-2 rounded-lg"
                    >
                      {danceStyle}
                    </div>
                  ))}
                </div>
              </td>
              <td className="border border-green-200 rounded-md text-center p-2 w-2/12">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/dancers/details/${dancer._id}`}>
                    <BsInfoCircle className="text-2xl text-green-700 hover:text-green-900" />
                  </Link>
                  <Link to={`/dancers/edit/${dancer._id}`}>
                    <AiOutlineEdit className="text-2xl text-green-700 hover:text-green-900" />
                  </Link>
                  <Link to={`/dancers/delete/${dancer._id}`}>
                    <MdOutlineDelete className="text-2xl text-green-700 hover:text-green-900" />
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
