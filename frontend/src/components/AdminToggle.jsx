/* eslint-disable react/prop-types */
const AdminToggle = ({ showOperations, setShowOperations }) => {
  const handleToggleAdminMode = () => {
    showOperations ? setShowOperations(false) : setShowOperations(true);
  };

  return (
    <div>
      <button
        onClick={handleToggleAdminMode}
        className="bg-yellow-500 rounded-full p-4"
      >
        Admin Mode
      </button>
    </div>
  );
};

export default AdminToggle;
