/* eslint-disable react/prop-types */

import DancerSingleCard from './DancerSingleCard';
import DancerModal from './DancerModal';
import { useState } from 'react';

const DancersCard = ({ data, showOperations, showModal, setShowModal }) => {
  const [selectedDancer, setSelectedDancer] = useState({});

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((dancer) => (
        <DancerSingleCard
          key={dancer._id}
          dancer={dancer}
          showOperations={showOperations}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedDancer={selectedDancer}
          setSelectedDancer={setSelectedDancer}
        />
      ))}
      {showModal && (
        <DancerModal
          dancer={selectedDancer}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DancersCard;
