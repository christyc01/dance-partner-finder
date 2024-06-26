/* eslint-disable react/prop-types */

import { AiOutlineEdit } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const DancerSingleCard = ({
  dancer,
  showOperations,
  setShowModal,
  setSelectedDancer,
}) => {
  return (
    <div className="border-2 border-emerald-300 bg-emerald-200 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
          setSelectedDancer(() => dancer);
        }}
      >
        <div className="flex justify-start items-center gap-x-2 text-emerald-900">
          <BiUserCircle className="text-2xl" />
          <h2 className="my-1">{dancer.name}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2 text-emerald-900 ">
          <GrLocation className="text-2xl" />
          <h2 className="my-1">{dancer.location}</h2>
        </div>
        <div className="flex flex-wrap pt-4 gap-3">
          {dancer?.danceStyles?.map((danceStyle) => (
            <div
              key={danceStyle}
              className="bg-emerald-500 text-white rounded-full px-3 py-1"
            >
              {danceStyle}
            </div>
          ))}
        </div>
        {showOperations && (
          <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
            <Link to={`/dancers/details/${dancer._id}`}>
              <BsInfoCircle className="text-2xl text-emerald-800" />
            </Link>
            <Link to={`/dancers/edit/${dancer._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600" />
            </Link>
            <Link to={`/dancers/delete/${dancer._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DancerSingleCard;
