import moment from "moment";

const DetailCard = ({ weatherIcon, data }) => {
  const { city } = data;
  const { clouds, main, weather, wind } = data.list[0];

  return (
    <div className="container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/3 mb-auto">
      <div className="my-auto">
        <p className="font-bold text-5xl text-pink-800 mb-2">
          {Math.round(main.temp)}&deg;C
        </p>
        <p className="text-4xl text-gray-800 tracking-widest">
          {weather[0].main}
          <img className="w-1/4 inline" src={weatherIcon} />
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest">
          {weather[0].description}
        </p>
        <p className="tracking-widest">{moment().format("dddd MMM YYYY")}</p>
      </div>
      <div className="my-2 border-1-2 border-gray-100 p-2">
        <p className="text-gray-400 text-md mb-1">Wind Speed: {wind.speed}</p>
        <p className="text-gray-400 text-md mb-1">
          Humidity: {main.humidity} %
        </p>
        <p className="text-gray-400 text-md mb-1">
          Cloud Cover: {clouds.all} %
        </p>
        <p className="text-gray-400 text-md mb-1">
          Sunrise: {new Date(city.sunrise * 1000).toLocaleTimeString("en-IN")}
        </p>
        <p className="text-gray-400 text-md">
          Sunset: {new Date(city.sunset * 1000).toLocaleTimeString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default DetailCard;
