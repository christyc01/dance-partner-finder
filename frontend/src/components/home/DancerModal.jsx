/* eslint-disable react/prop-types */
import { AiOutlineClose } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';

const DancerModal = ({ dancer, closeModal }) => {
  return (
    <div
      className="flex flex-col fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 justify-center items-center"
      onClick={closeModal}
    >
      <div className="bg-white rounded-xl overflow-scroll">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[600px] max-w-full p-4 flex flex-col relative"
        >
          <AiOutlineClose
            onClick={closeModal}
            className="absolute right-6 top-6 text-3xl text-emerald-600 cursor-pointer"
          />
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-black text-2xl" />
            <h2 className="my-1">{dancer.name}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <GrLocation className="text-black-300 text-2xl" />
            <h2 className="my-1">{dancer.location}</h2>
          </div>
          <div className="w-fit py-1 flex flex-wrap">
            {dancer?.danceStyles?.map((danceStyle) => (
              <div
                key={danceStyle}
                className="bg-emerald-500 text-white rounded-full p-3 m-3"
              >
                {danceStyle}
              </div>
            ))}
          </div>
          <p className="mt-4">Random details to come...</p>
          <p className="my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
            voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
            necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
            nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
            dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
            vitae voluptate sequi repellat!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DancerModal;
