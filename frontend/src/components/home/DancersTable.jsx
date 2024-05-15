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
    // console.log('allLocations:', allLocations);
    const uniqueLocations = allLocations.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    // console.log('uniqueLocations:', uniqueLocations);
    setAllUniqueLocationsArray(uniqueLocations);
  }, [data]);
  console.log('allUniqueLocationsArray:', allUniqueLocationsArray);

  // Get all & unique dance styles
  useEffect(() => {
    const allDanceStyles = data.flatMap((dancer) => dancer.danceStyles || []);
    // console.log('allDanceStyles:', allDanceStyles);
    const uniqueDanceStyles = allDanceStyles.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    // console.log('uniqueDanceStyles:', uniqueDanceStyles);
    setAllUniqueDanceStylesArray(uniqueDanceStyles);
  }, [data]);
  console.log('allUniqueDanceStylesArray:', allUniqueDanceStylesArray);

  // Set data to show based on filtered locations/dance styles
  useEffect(() => {
    console.log('Set data to show based on filtered locations/dance styles');
  }, []);

  return (
    <div>
      <div>
        <div className="bg-green-500 z-60">
          <p
            onClick={() => {
              setLocationToShow('');
            }}
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
              >
                View {uniqueLocation} dancers
              </p>
            ))}
        </div>
        <div className="bg-yellow-500 z-60">
          <p
            onClick={() => {
              setDanceStyleToShow('');
            }}
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
              >
                View {uniqueDanceStyle} dancers
              </p>
            ))}
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
