/* eslint-disable react/prop-types */
const AdminToggle = ({ showOperations, setShowOperations }) => {
  return (
    <div>
      <button
        onClick={() => setShowOperations(true)}
        className={`hover:bg-emerald-500 px-4 py-1 rounded-l-full ${
          showOperations ? 'bg-emerald-500' : 'bg-emerald-300'
        }`}
      >
        Admin Mode On
      </button>
      <button
        onClick={() => setShowOperations(false)}
        className={`hover:bg-emerald-500 px-4 py-1 rounded-r-full ${
          !showOperations ? 'bg-emerald-500' : 'bg-emerald-300'
        }`}
      >
        Admin Mode Off
      </button>
    </div>
  );
};

export default AdminToggle;
