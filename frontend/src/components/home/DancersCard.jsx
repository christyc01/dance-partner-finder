/* eslint-disable react/prop-types */

import DancerSingleCard from './DancerSingleCard';

const DancersCard = ({ data, showOperations, showModal, setShowModal }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((dancer) => (
        <DancerSingleCard
          key={dancer._id}
          dancer={dancer}
          showOperations={showOperations}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ))}
    </div>
  );
};

export default DancersCard;
