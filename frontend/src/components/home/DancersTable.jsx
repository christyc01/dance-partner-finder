/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Filters from '../Filters';
import DancerModal from './DancerModal';

const DancersTable = ({ data, showOperations, showModal, setShowModal }) => {
  const [dataToShow, setDataToShow] = useState(data);
  const [locationsToShow, setLocationsToShow] = useState([]);
  const [allUniqueLocationsArray, setAllUniqueLocationsArray] = useState([]);
  const [danceStylesToShow, setDanceStylesToShow] = useState([]);
  const [allUniqueDanceStylesArray, setAllUniqueDanceStylesArray] = useState(
    []
  );
  const [selectedDancer, setSelectedDancer] = useState({});

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
    if (danceStylesToShow.length) {
      filteredData = filteredData.filter((item) =>
        danceStylesToShow.some((danceStyle) =>
          item.danceStyles.includes(danceStyle)
        )
      );
    }
    setDataToShow(filteredData);
  }, [locationsToShow, danceStylesToShow, data]);

  return (
    <div className="p-0 md:p-4">
      <Filters
        locationsToShow={locationsToShow}
        setLocationsToShow={setLocationsToShow}
        danceStylesToShow={danceStylesToShow}
        setDanceStylesToShow={setDanceStylesToShow}
        allUniqueLocationsArray={allUniqueLocationsArray}
        allUniqueDanceStylesArray={allUniqueDanceStylesArray}
      />

      {/* SMALL SCREENS */}
      <table className="md:hidden w-full border-separate table-fixed">
        <tbody>
          {dataToShow.map((dancer) => (
            <tr
              key={dancer._id}
              className="flex flex-col"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
                setSelectedDancer(dancer);
              }}
            >
              <td className="mt-2 bg-emerald-50 flex justify-between">
                <div className="p-2">{dancer.name}</div>
                <div className="p-2">{dancer.location}</div>
              </td>
              <td className="p-2 bg-emerald-50">
                <div className="flex flex-wrap gap-2">
                  {dancer?.danceStyles?.map((danceStyle) => (
                    <div
                      key={danceStyle}
                      className="bg-emerald-300 p-2 rounded-lg"
                    >
                      {danceStyle}
                    </div>
                  ))}
                </div>
              </td>
              {showOperations && (
                <td className="mb-2 bg-emerald-50 text-center p-2">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/dancers/details/${dancer._id}`}>
                      <BsInfoCircle className="text-2xl text-emerald-700 hover:text-emerald-900" />
                    </Link>
                    <Link to={`/dancers/edit/${dancer._id}`}>
                      <AiOutlineEdit className="text-2xl text-emerald-700 hover:text-emerald-900" />
                    </Link>
                    <Link to={`/dancers/delete/${dancer._id}`}>
                      <MdOutlineDelete className="text-2xl text-emerald-700 hover:text-emerald-900" />
                    </Link>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* LARGE SCREENS */}
      <table className="max-md:hidden w-full border-separate border-spacing-2 table-fixed">
        <thead>
          <tr className="bg-emerald-200">
            <th className="border border-emerald-300 rounded-md p-2 w-3/12">
              Name
            </th>
            <th className="border border-emerald-300 rounded-md p-2 w-3/12">
              Location
            </th>
            <th className="border border-emerald-300 rounded-md p-2 w-4/12">
              Dance Styles
            </th>
            {showOperations && (
              <th className="border border-emerald-300 rounded-md p-2 w-2/12">
                Operations
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((dancer) => (
            <tr
              key={dancer._id}
              className="h-8 bg-emerald-50"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
                setSelectedDancer(dancer);
              }}
            >
              <td className="border border-emerald-200 rounded-md p-2 w-3/12">
                {dancer.name}
              </td>
              <td className="border border-emerald-200 rounded-md p-2 w-3/12">
                {dancer.location}
              </td>
              <td className="border border-emerald-200 rounded-md p-2 w-4/12">
                <div className="flex flex-wrap gap-2">
                  {dancer?.danceStyles?.map((danceStyle) => (
                    <div
                      key={danceStyle}
                      className="bg-emerald-500 text-white p-2 rounded-full"
                    >
                      {danceStyle}
                    </div>
                  ))}
                </div>
              </td>
              {showOperations && (
                <td className="border border-emerald-200 rounded-md text-center p-2 w-2/12">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/dancers/details/${dancer._id}`}>
                      <BsInfoCircle className="text-2xl text-emerald-700 hover:text-emerald-900" />
                    </Link>
                    <Link to={`/dancers/edit/${dancer._id}`}>
                      <AiOutlineEdit className="text-2xl text-emerald-700 hover:text-emerald-900" />
                    </Link>
                    <Link to={`/dancers/delete/${dancer._id}`}>
                      <MdOutlineDelete className="text-2xl text-emerald-700 hover:text-emerald-900" />
                    </Link>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <DancerModal
          dancer={selectedDancer}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DancersTable;
