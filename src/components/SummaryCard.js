const SummaryCard = ({ today }) => {
  const dayIcon = `${
    process.env.REACT_APP_WEATHER_ICON_URL + today.weather[0]["icon"]
  }@2x.png`;

  return (
    <li className="container p-4 flex items-center justify-center bg-gray-200 rounded-lg my-auto mr-1">
      <div className="my-auto">
        <p className="font-bold text-3x1 text-pink-600 mb-2">
          {Math.round(today.main.temp)}&deg;C
        </p>
        <p className="text-2xl text-gray-800 tracking-widest">
          {today.weather[0].main}
          <img src={dayIcon} className="w-1/4 inline" />
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest">
          {today.weather[0].description}
        </p>
        <p className="tracking-wider">
          {new Date(today.dt * 1000).toLocaleTimeString("en-IN")}
        </p>
      </div>
    </li>
  );
};

export default SummaryCard;
