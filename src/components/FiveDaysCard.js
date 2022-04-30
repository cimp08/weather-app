import React from "react";

const FiveDaysCard = ({ forecast, convert }) => {
  const formattedList = forecast.list.reduce((acc, curr) => {
    const dateTime = new Date(curr.dt * 1000);
    const day = dateTime.getDate();
    const time = dateTime.getHours();
    const today = new Date();

    if (
      /* !acc.find((d) => d?.day === day && d?.time) && */
      day !== today.getDate() &&
      curr.dt_txt.includes("09:00:00")
    ) {
      const newDay = {
        ...curr,
        day,
        time,
      };
      acc.push(newDay);
    }
    return acc;
  }, []);

  /* console.log(formattedList);
  const today = new Date();
  console.log(today.getHours()); */

  return (
    <div class="overflow-x-auto">
      <ul className="flex flex-row w-max mb-2">
        {formattedList.map((days) => (
          <li className="p-4 flex items-center justify-center bg-gray-200 rounded-lg my-auto mr-3">
            <div className="my-auto">
              <p className="font-bold text-3x1 text-pink-600 mb-2">
                {convert
                  ? `${Math.round(days.main.temp)} °C`
                  : `${Math.round(days.main.temp * 2 + 30)} °F`}
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
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
                {days.weather[0].description}
              </p>
              <p className="tracking-wider">Date: {days.dt_txt.slice(0, 10)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiveDaysCard;
