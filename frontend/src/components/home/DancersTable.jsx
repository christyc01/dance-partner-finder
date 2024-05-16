/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const DancersTable = ({ data }) => {
  const [dataToShow, setDataToShow] = useState(data);
  const [locationsToShow, setLocationsToShow] = useState([]);
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
    let filteredData = data;
    if (locationsToShow.length) {
      filteredData = filteredData.filter((item) =>
        locationsToShow.includes(item.location)
      );
    }
    if (danceStyleToShow) {
      filteredData = filteredData.filter((item) =>
        item.danceStyles.includes(danceStyleToShow)
      );
    }
    setDataToShow(filteredData);
  }, [locationsToShow, danceStyleToShow, data]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-6">
        <div className="bg-white shadow-lg p-4 rounded-lg w-full mr-4">
          <h3 className="text-xl font-semibold mb-2 text-green-600">
            Filter by Location
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setLocationsToShow('')}
              className={`py-2 px-4 rounded-full transition-colors ${
                !locationsToShow.length
                  ? 'bg-green-500 text-white'
                  : 'bg-green-200 text-green-700'
              }`}
            >
              View all
            </button>
            {allUniqueLocationsArray.map((uniqueLocation) => (
              <button
                key={uniqueLocation}
                onClick={() =>
                  locationsToShow.includes(uniqueLocation)
                    ? setLocationsToShow(
                        locationsToShow.filter(
                          (item) => !(item === uniqueLocation)
                        )
                      )
                    : setLocationsToShow([...locationsToShow, uniqueLocation])
                }
                className={`py-2 px-4 rounded-full transition-colors ${
                  locationsToShow.includes(uniqueLocation)
                    ? 'bg-green-500 text-white'
                    : 'bg-green-200 text-green-700'
                }`}
              >
                {uniqueLocation}
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
              onClick={() => setDanceStyleToShow('')}
              className={`py-2 px-4 rounded-full transition-colors ${
                !danceStyleToShow
                  ? 'bg-green-500 text-white'
                  : 'bg-green-200 text-green-700'
              }`}
            >
              View all
            </button>
            {allUniqueDanceStylesArray.map((uniqueDanceStyle) => (
              <button
                key={uniqueDanceStyle}
                onClick={() => setDanceStyleToShow(uniqueDanceStyle)}
                className={`py-2 px-4 rounded-full transition-colors ${
                  uniqueDanceStyle === danceStyleToShow
                    ? 'bg-green-500 text-white'
                    : 'bg-green-200 text-green-700'
                }`}
              >
                {uniqueDanceStyle}
              </button>
            ))}
          </div>
        </div>
      </div>
      <table className="w-full border-separate border-spacing-2 table-fixed">
        <thead>
          <tr className="bg-green-200">
            <th className="border border-green-300 rounded-md p-2 w-3/12">
              Name
            </th>
            <th className="border border-green-300 rounded-md p-2 max-md:hidden w-3/12">
              Location
            </th>
            <th className="border border-green-300 rounded-md p-2 max-md:hidden w-4/12">
              Dance Styles
            </th>
            <th className="border border-green-300 rounded-md p-2 w-2/12">
              Operations
            </th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((dancer) => (
            <tr key={dancer._id} className="h-8 bg-green-50">
              <td className="border border-green-200 rounded-md p-2 w-3/12">
                {dancer.name}
              </td>
              <td className="border border-green-200 rounded-md p-2 w-3/12">
                {dancer.location}
              </td>
              <td className="border border-green-200 rounded-md p-2 w-4/12">
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
