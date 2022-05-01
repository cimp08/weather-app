import React from "react";

const FormSection = (props) => {
  return (
    <div className="form-container">
      <div className="flex items-center justify-center">
        <h3 className="my-auto mr-auto text-sm md:text-xl text-pink-800 font-bold shadow-md py-1 px-3 rounded-md bg-white bg-opacity-30 uppercase">
          Forecast
        </h3>
        <div className="flex p-2 text.gray-100 bg-gray-200 bg-opacity-30 rounded.lg">
          <i className="fa fa-map my-auto" aria-hidden="true"></i>
          <div className="text-right">
            <p className="font-semibold text-sm ml-2 text-pink-800 uppercase">
              {props.city}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="weatherfy mt-10 lg:mt-0 text-white text-xl uppercase">
          Welcome To Weatherfy
        </h1>
        <hr className="h-0.5 bg-white w-1/4 rounded-full my-5" />
        <form
          noValidate
          onSubmit={props.handleSubmit}
          className="flex justify-center w-full"
        >
          <input
            type="text"
            placeholder="Enter City"
            onChange={props.handleChange}
            required
            className="search-input relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
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
              navigator.geolocation.getCurrentPosition(
                props.myLocationOnSuccess
              )
            }
          ></i>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
