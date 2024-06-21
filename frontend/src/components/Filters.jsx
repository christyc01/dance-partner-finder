/* eslint-disable react/prop-types */
const Filters = ({
  locationsToShow,
  setLocationsToShow,
  danceStylesToShow,
  setDanceStylesToShow,
  allUniqueLocationsArray,
  allUniqueDanceStylesArray,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6">
      <div className="bg-white shadow-lg p-4 md:rounded-lg w-full lg:w-1/2 mr-4">
        <h3 className="text-xl font-semibold mb-2 text-emerald-600">
          Filter by Location
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setLocationsToShow('')}
            className={`px-3 py-1 rounded-full transition-colors ${
              !locationsToShow.length
                ? 'bg-emerald-500 text-white'
                : 'bg-emerald-200 text-emerald-700'
            }`}
          >
            View all
          </button>
          {allUniqueLocationsArray.map((uniqueLocation) => (
            <button
              key={uniqueLocation}
              onClick={() =>
                locationsToShow.includes(uniqueLocation)
                  ? setLocationsToShow(
                      locationsToShow.filter(
                        (item) => !(item === uniqueLocation)
                      )
                    )
                  : setLocationsToShow([...locationsToShow, uniqueLocation])
              }
              className={`px-3 py-1 rounded-full transition-colors ${
                locationsToShow.includes(uniqueLocation)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-200 text-emerald-700'
              }`}
            >
              {uniqueLocation}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-lg p-4 md:rounded-lg w-full lg:w-1/2">
        <h3 className="text-xl font-semibold mb-2 text-emerald-600">
          Filter by Dance Style
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setDanceStylesToShow([])}
            className={`px-3 py-1 rounded-full transition-colors ${
              !danceStylesToShow.length
                ? 'bg-emerald-500 text-white'
                : 'bg-emerald-200 text-emerald-700'
            }`}
          >
            View all
          </button>
          {allUniqueDanceStylesArray.map((uniqueDanceStyle) => (
            <button
              key={uniqueDanceStyle}
              onClick={() =>
                danceStylesToShow.includes(uniqueDanceStyle)
                  ? setDanceStylesToShow(
                      danceStylesToShow.filter(
                        (item) => !(item === uniqueDanceStyle)
                      )
                    )
                  : setDanceStylesToShow([
                      ...danceStylesToShow,
                      uniqueDanceStyle,
                    ])
              }
              className={`px-3 py-1 rounded-full transition-colors ${
                danceStylesToShow.includes(uniqueDanceStyle)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-200 text-emerald-700'
              }`}
            >
              {uniqueDanceStyle}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
