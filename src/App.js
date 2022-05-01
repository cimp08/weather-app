import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import DetailCard from "./components/DetailCard";
import HourlyCard from "./components/HourlyCard";
import FiveDaysCard from "./components/FiveDaysCard";
import FormSection from "./components/FormSection";

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [city, setCity] = useState("Unknown city");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");
  const [convert, setConvert] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_WEATHER_ICON_URL}10@2x.png`
  );

  const handleConvert = () => {
    setConvert(!convert);
  };

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
      <div className="flex flex-col lg:flex-row w-3/4 w-4/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
        {/* FORM SECTION */}
        <FormSection
          city={city}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          myLocationOnSuccess={myLocationOnSuccess}
        />

        {/* CARD SECTION */}
        <div className="lg:w-2/4 px-5">
          <div className="flex flex-col my-10">
            {weatherData.length === 0 ? (
              <div className="container p-4 flex items-center justify-center h1/3 mb-auto">
                <h1 className="text-gray-300 text-4xl font-bold uppercase">
                  {error ? error : "Search something"}
                </h1>
              </div>
            ) : (
              <>
                <DetailCard
                  weatherIcon={weatherIcon}
                  data={weatherData}
                  handleConvert={() => handleConvert()}
                  convert={convert}
                />
                <HourlyCard today={weatherData} convert={convert} />
                <FiveDaysCard forecast={weatherData} convert={convert} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
