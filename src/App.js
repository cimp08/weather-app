import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  const [city, setCity] = useState("Unknown city");

  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <div className="bg-gray-200 flex items-center justify-center w-screen h-screen py-10">
      <div className="flex w-3/4 min-hfull rounded-3xl shadow-lg m-auto bg-gray-100">
        {/* FORM SECTION */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-red-700 font-bold shadow-md py-1 px-3 rounded-md bg-white bg-opacity-30">
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
            <h1 className="text-white text-2xl1">Weather Forecast</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex justify-center w-full"
            >
              <input
                type="text"
                onChange={handleChange}
                required
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
              />
              <button type="submit" className="z-10">
                <i
                  className="fa fa-search text-white ml-10 border-1 my-auto z-10 cursor-pointer"
                  aria-hidden="true"
                ></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
