import React from "react";

const SummaryCard = ({ today }) => {
  const onlyToday = today.list.filter((item) => {
    const dateTime = new Date(item.dt * 1000);
    const day = dateTime.getDate();
    const today = new Date();

    if (day === today.getDate()) {
      return item;
    }
  });

  return (
    <>
      <div class="overflow-x-auto ...">
        <ul className="grid grid-cols-2 gap-2">
          {onlyToday.map((days) => (
            <li className="container p-4 flex items-center justify-center bg-gray-200 rounded-lg my-auto mr-1">
              <div className="my-auto">
                <p className="font-bold text-3x1 text-pink-600 mb-2">
                  {Math.round(days.main.temp)}&deg;C
                </p>
                <p className="text-2xl text-gray-800 tracking-widest">
                  {days.weather[0].main}
                  <img
                    src={`${
                      process.env.REACT_APP_WEATHER_ICON_URL +
                      days.weather[0]["icon"]
                    }@2x.png`}
                    className="w-1/4 inline"
                  />
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">
                  {days.weather[0].description}
                </p>
                <p className="text-xs tracking-widest mb-1">
                  Wind Speed: {days.wind.speed} m/s
                </p>
                <p className="text-xs tracking-widest mb-4">
                  Humidity: {days.main.humidity}%
                </p>
                <p className="tracking-wider">{days.dt_txt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SummaryCard;
