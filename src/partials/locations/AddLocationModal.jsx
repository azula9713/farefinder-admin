import React, { useState } from "react";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import * as PopularLocationAPI from "../../api/PopularLocationsAPI";
import { useRecoilValue } from "recoil";
import { popularLocationAtom } from "../../atoms/popularLocationAtom";

const toastOptions = {
  style: {
    background: "#04111d",
    color: "#fff",
  },
};

const AddLocationModal = () => {
  const popLocations = useRecoilValue(popularLocationAtom);

  const [locTitle, setLocTitle] = useState("");
  const [locDesc, setLocDesc] = useState("");
  const [locUrl, setLocUrl] = useState("");
  const [locAirportCode, setLocAirportCode] = useState("");
  const [locHotel, setLocHotel] = useState("");
  const [locRide, setLocRide] = useState("");
  const [isLocActive, setIsLocActive] = useState(false);

  const { mutate, isLoading } = useMutation(
    PopularLocationAPI.createNewPopularLocation,
    {
      onSuccess: (data) => {
        // [TODO]:Add the toast
      },
    }
  );

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center font-bold text-black">Add New Location</h2>
      <div>
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="location-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location Title
                    </label>
                    <input
                      type="text"
                      value={locTitle}
                      onChange={(e) => {
                        setLocTitle(e.target.value);
                      }}
                      name="location-name"
                      id="location-name"
                      autoComplete="location-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      value={locDesc}
                      onChange={(e) => {
                        setLocDesc(e.target.value);
                      }}
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Brief description about the city"
                      defaultValue={""}
                    />
                  </div>
                </div>

                {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="image-url"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={locUrl}
                      onChange={(e) => {
                        setLocUrl(e.target.value);
                      }}
                      name="image-url"
                      id="image-url"
                      autoComplete="image-url"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="airport-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location Airport Code
                    </label>
                    <input
                      type="text"
                      name="airport-code"
                      value={locAirportCode}
                      onChange={(e) => {
                        setLocAirportCode(e.target.value);
                      }}
                      id="airport-code"
                      autoComplete="airport-code"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="hotel-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Hotel Details
                    </label>
                    <input
                      type="text"
                      value={locHotel}
                      onChange={(e) => {
                        setLocHotel(e.target.value);
                      }}
                      name="hotel-code"
                      id="hotel-code"
                      autoComplete="hotel-code"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="car-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ride Details
                    </label>
                    <input
                      type="text"
                      value={locRide}
                      onChange={(e) => {
                        setLocRide(e.target.value);
                      }}
                      name="car-code"
                      id="car-code"
                      autoComplete="car-code"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="active-loc"
                      name="active-loc"
                      value={isLocActive}
                      checked={isLocActive}
                      onChange={() => {
                        if (!isLocActive && popLocations.length < 9) {
                          setIsLocActive(true);
                        } else if (isLocActive) {
                          setIsLocActive(false);
                        } else {
                          toast.error(
                            "Cannot set more than 9 active locations at once",
                            toastOptions
                          );
                        }
                      }}
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="active-loc"
                      className="font-medium text-gray-700"
                    >
                      Make Active Location
                    </label>
                    {/* <p className="text-gray-500">
                  Get notified when someones posts a comment on a
                  posting.
                </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-8 mt-8">
        <button
          onClick={() => {
            const data = {
              locationTitle: locTitle,
              locationDescription: locDesc,
              locationImage: locUrl,
              locationAirportCode: locAirportCode,
              locationHotelCode: locHotel,
              locationCarCode: locRide,
              isActive: isLocActive,
            };
            mutate(data);
          }}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {isLoading ? "Creating Location..." : "Create Location"}
        </button>
      </div>
    </div>
  );
};

export default AddLocationModal;
