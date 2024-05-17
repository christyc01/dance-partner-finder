/* eslint-disable react/prop-types */

import { AiOutlineEdit } from 'react-icons/ai';
import { BiShow, BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DancerModal from './DancerModal';

const DancerSingleCard = ({ dancer, showOperations }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      key={dancer._id}
      className="border-2 border-emerald-300 bg-emerald-200 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
    >
      <h4 className="my-2 text-gray-500">{dancer._id}</h4>
      <div className="flex justify-start items-center gap-x-2 text-emerald-900">
        <BiUserCircle className="text-2xl" />
        <h2 className="my-1">{dancer.name}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2 text-emerald-900 ">
        <GrLocation className="text-2xl" />
        <h2 className="my-1">{dancer.location}</h2>
      </div>
      <div className="flex flex-wrap">
        {dancer?.danceStyles?.map((danceStyle) => (
          <div
            key={danceStyle}
            className="bg-emerald-500 text-white rounded-full p-3 m-3"
          >
            {danceStyle}
          </div>
        ))}
      </div>
      {showOperations && (
        <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          />
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
      {showModal && (
        <DancerModal dancer={dancer} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default DancerSingleCard;
