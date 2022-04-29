// Kunna se följande väderförhållanden för sin nuvarande position:
// Temperatur
// Vindstyrka
// Luftfuktighet
// Soluppgång och nedgång (klockslag)
// Välja mellan Fahrenheit och Celsius
// Kunna få en väderleksprognos för väderförhållanden (enligt ovan) med:
// Kort översikt av vädret (e.g. ha med temperatur och någon mer information) för 5 dagar framåt
// Information för resten av dagen (med data för varje eller var tredje timme) för nuvarande dygn (e.g. ha med temperatur, nuvarande väder, vindstyrka och luftfuktighet).
// Du får gärna ha med någon annan intressant information om du vill.
// Nyttja ett väder-API, t.ex. SMHI, YR.NO, OpenWeatherMaps (exempel kommer ges med OpenWeatherMap)
// Nyttja positionering via geolocation i webbläsaren
// Design/färg & form baserad på https://weather.com/weather/today/ (Länkar till en externa sida.) eller liknande applikationer/appar (lättförståelig och lättöverblickad)

import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import DetailCard from "./components/DetailCard";
import SummaryCard from "./components/SummaryCard";
import FiveDaysCard from "./components/FiveDaysCard";

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [city, setCity] = useState("Unknown city");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_WEATHER_ICON_URL}10@2x.png`
  );

  const getWeather = async (location) => {
    setWeatherData([]);

    const cityOrGeo =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_WEATHER_URL}${cityOrGeo}&appid=${apiKey}&units=metric`
      );

      const data = await res.json();
      if (data.cod !== "200") {
        setError("No Location Found.");
        return;
      }
      console.log(data);
      setError("");
      setWeatherData(data);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${process.env.REACT_APP_WEATHER_ICON_URL}${data.list[0].weather[0]["icon"]}@4x.png`
      );
    } catch (error) {
      console.log("Error:" + error);
      setError("Something went wrong, try again.");
    }
  };

  const handleChange = (input) => {
    const { value } = input.target;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };

  const myLocationOnSuccess = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  return (
    <div className="flex items-center justify-center h-screen py-10">
      <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
        {/* FORM SECTION */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-yellow-300 font-bold shadow-md py-1 px-3 rounded-md bg-white bg-opacity-30">
              Forecast
            </h3>
            <div className="flex p-2 text.gray-100 bg-gray-200 bg-opacity-30 rounded.lg">
              <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-xl uppercase">
              Welcome To Weatherfy
            </h1>
            <hr className="h-0.5 bg-white w-1/4 rounded-full my-5" />
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex justify-center w-full"
            >
              <input
                type="text"
                placeholder="Enter City"
                onChange={handleChange}
                required
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
              />
              <button type="submit" className="z-10">
                <i
                  className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3"
                  aria-hidden="true"
                  type="submit"
                ></i>
              </button>
              <i
                className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white"
                aria-hidden="true"
                onClick={() =>
                  navigator.geolocation.getCurrentPosition(myLocationOnSuccess)
                }
              ></i>
            </form>
          </div>
        </div>
        {/* CARD SECTION */}
        <div className="w-2/4 px-5">
          <div className="flex flex-col my-10">
            {weatherData.length === 0 ? (
              <div className="container p-4 flex items-center justify-center h1/3 mb-auto">
                <h1 className="text-gray-300 text-4xl font-bold uppercase">
                  {error ? error : "Search something"}
                </h1>
              </div>
            ) : (
              <>
                <h1 className="text-5xl text-gray-800 mt-auto mb-4">Now</h1>
                <DetailCard weatherIcon={weatherIcon} data={weatherData} />

                <h1 className="text-3xl text-gray-600 mb-4 mt-10">Today</h1>
                <SummaryCard today={weatherData} />

                <h1 className="text-3xl text-gray-600 mb-4 mt-10">Forecast</h1>
                <FiveDaysCard forecast={weatherData} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
