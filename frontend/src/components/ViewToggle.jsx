/* eslint-disable react/prop-types */
const ViewToggle = ({ view, setView }) => {
  return (
    <div className="w-full max-w-64">
      <button
        onClick={() => setView('table')}
        className={`w-1/2 hover:bg-emerald-500 px-4 py-1 rounded-l-full ${
          view === 'table' ? 'bg-emerald-500' : 'bg-emerald-300'
        } `}
      >
        Table View
      </button>
      <button
        onClick={() => setView('card')}
        className={`w-1/2 hover:bg-emerald-500 px-4 py-1 rounded-r-full ${
          view === 'card' ? 'bg-emerald-500' : 'bg-emerald-300'
        }`}
      >
        Card View
      </button>
    </div>
  );
};

export default ViewToggle;
