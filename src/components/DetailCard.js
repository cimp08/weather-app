import React, { useState, useEffect } from "react";
import moment from "moment";

const DetailCard = ({ weatherIcon, data, handleConvert, convert }) => {
  const { city } = data;
  const { clouds, main, weather, wind } = data.list[0];

  const Farenheit = `${Math.round(data.list[0].main.temp * 2 + 30)} °F`;
  const Celcius = `${Math.round(data.list[0].main.temp)} °C`;
  const [unit, setUnit] = useState(Celcius);

  const oppositeUnit = unit === Celcius ? "Farenheit" : "Celsius";

  useEffect(() => {
    convert ? setUnit(Celcius) : setUnit(Farenheit);
  }, [Celcius, Farenheit, convert]);

  return (
    <>
      <div className="flex justify-end">
        <p className="text-xl mr-2">Change to:</p>
        <button
          className="text-pink-800 text-xl font bold"
          onClick={handleConvert}
        >
          {oppositeUnit}
        </button>
      </div>

      <h1 className="text-5xl text-gray-800 mt-auto mb-4">{city.name}</h1>
      <div className="container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/3 mb-auto">
        <div className="my-auto">
          <p className="font-bold text-5xl text-pink-800 mb-2">{unit}</p>
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
    </>
  );
};

export default DetailCard;
