/* eslint-disable react/prop-types */
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const DancersTable = ({ data }) => {
  return (
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
        {data.map((dancer, index) => (
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
  );
};

export default DancersTable;
