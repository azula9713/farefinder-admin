import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import {
  OfficeBuildingIcon,
  PaperAirplaneIcon,
  PencilIcon,
  TruckIcon,
} from "@heroicons/react/solid";

import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import * as PopularLocationAPI from "../api/PopularLocationsAPI";
import { popularLocationAtom } from "../atoms/popularLocationAtom";

const PopularLocation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //get locationId from url
  const { locationId } = useParams();
  const navigate = useNavigate();
  const popLocations = useRecoilValue(popularLocationAtom);

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [newAirportCode, setNewAirportCode] = useState("");
  const [newHotel, setNewHotel] = useState("");
  const [newCar, setNewCar] = useState("");

  const { data, isLoading } = useQuery(["selectedLocation", locationId], () =>
    PopularLocationAPI.getSelectedPopularLocation(locationId)
  );

  const { mutate: edit, isLoading: updating } = useMutation(
    PopularLocationAPI.updateSelectedPopularLocation,
    {
      onSuccess: () => {
        setIsEdit(false);
      },
    }
  );

  const { mutate: deleteLoc, isLoading: deleting } = useMutation(
    PopularLocationAPI.deleteSelectedPopularLocation,
    {
      onSuccess: () => {
        navigate("/popular-locations");
        setIsEdit(false);
      },
    }
  );

  useEffect(() => {
    if (data?.locationId) {
      setNewTitle(data.locationTitle);
      setNewImage(data.locationImage);
      setNewDescription(data.locationDescription);
      setIsActive(data.isActive);
      setNewAirportCode(data.locationAirportCode);
      setNewHotel(data.locationHotelCode);
      setNewCar(data.locationCarCode);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="px-4 sm:px-6 lg:px-8 pb-8 w-full max-w-9xl mx-auto">
              <section className="text-gray-700 body-font overflow-hidde">
                <div className="container px-5 py-24 mx-auto">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                      alt={data.locationTitle}
                      className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                      src={data.locationImage}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <div className="flex space-x-5 items-center justify-start">
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                          {data.locationTitle}
                        </h1>
                        <div>
                          <PencilIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                              setIsEdit(!isEdit);
                            }}
                          />
                        </div>
                      </div>

                      <p className="leading-relaxed">
                        {data.locationDescription}
                      </p>

                      <div className="flex my-8 flex-col">
                        <div className="p-2 m-2 flex items-center justify-start space-x-10">
                          <PaperAirplaneIcon className="h-6 w-6" />
                          <div>{data.locationAirportCode}</div>
                        </div>
                        <div className="p-2 m-2 flex items-center justify-start space-x-10">
                          <OfficeBuildingIcon className="h-6 w-6" />
                          <div>{data.locationHotelCode}</div>
                        </div>
                        <div className="p-2 m-2 flex items-center justify-start space-x-10">
                          <TruckIcon className="h-6 w-6" />
                          <div> {data.locationCarCode}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-2 rounded-lg p-4 mt-8 mx-12">
                    <div className="flex items-center justify-end mb-4">
                      {isActive ? (
                        <label
                          htmlFor="checked"
                          className="mt-1 inline-flex items-center cursor-pointer"
                        >
                          <span className="relative">
                            <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner" />
                            <span className="disabled:bg-slate-300 absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-600 transform translate-x-full">
                              <input
                                id="checked"
                                disabled={!isEdit}
                                type="checkbox"
                                onChange={() => {
                                  setIsActive(false);
                                }}
                                className="absolute opacity-0 w-0 h-0"
                              />
                            </span>
                          </span>
                          <span className="ml-3 text-sm">
                            Is Active Location
                          </span>
                        </label>
                      ) : (
                        <label
                          htmlFor="isActive"
                          className="mt-1 inline-flex items-center cursor-pointer"
                        >
                          <span className="relative">
                            <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner" />
                            <span className="disabled:bg-slate-300 absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
                              <input
                                disabled={!isEdit}
                                id="isActive"
                                type="checkbox"
                                onChange={() => {
                                  if (popLocations.length < 9) {
                                    setIsActive(true);
                                  }
                                }}
                                className="absolute opacity-0 w-0 h-0"
                              />
                            </span>
                          </span>
                          <span className="ml-3 text-sm">
                            Is Active Location
                          </span>
                        </label>
                      )}
                    </div>
                    <div className="  grid grid-cols-3 items-center">
                      <div className="col-span-1 mb-4">Title</div>
                      <div className="col-span-2 mb-4">
                        <input
                          type="text"
                          disabled={!isEdit}
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg p-2 disabled:bg-slate-300"
                        />
                      </div>
                      <div className="col-span-1 mb-4">Image</div>
                      <div className="col-span-2 mb-4">
                        <input
                          type="text"
                          disabled={!isEdit}
                          value={newImage}
                          onChange={(e) => setNewImage(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg p-2 disabled:bg-slate-300"
                        />
                      </div>
                      <div className="col-span-1 mb-4">Airport Code</div>
                      <div className="col-span-2 mb-4">
                        <input
                          type="text"
                          disabled={!isEdit}
                          value={newAirportCode}
                          onChange={(e) => setNewAirportCode(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg p-2 disabled:bg-slate-300"
                        />
                      </div>
                      <div className="col-span-1 mb-4">Hotel</div>
                      <div className="col-span-2 mb-4">
                        <input
                          type="text"
                          disabled={!isEdit}
                          value={newHotel}
                          onChange={(e) => setNewHotel(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg p-2 disabled:bg-slate-300"
                        />
                      </div>
                      <div className="col-span-1 mb-4">Car</div>
                      <div className="col-span-2 mb-4">
                        <input
                          type="text"
                          disabled={!isEdit}
                          value={newCar}
                          onChange={(e) => setNewCar(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg p-2 disabled:bg-slate-300"
                        />
                      </div>
                      <div className="col-span-1 mb-4">Description</div>
                      <div className="col-span-2 mb-4">
                        <textarea
                          type="text"
                          disabled={!isEdit || updating}
                          rows="4"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg p-2 disabled:bg-slate-300"
                        />
                      </div>
                    </div>
                    <div className="m-4 flex items-center justify-end space-x-5">
                      <button
                        disabled={!isEdit}
                        onClick={() => {
                          deleteLoc(locationId);
                        }}
                        className="disabled:bg-red-300 cursor-pointer px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300"
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                      <button
                        disabled={!isEdit || updating}
                        onClick={() => {
                          const updatedData = {
                            locationId: locationId,
                            locationTitle: newTitle,
                            locationImage: newImage,
                            locationAirportCode: newAirportCode,
                            locationHotelCode: newHotel,
                            locationCarCode: newCar,
                            locationDescription: newDescription,
                            isActive,
                          };

                          edit({
                            variables: { data: updatedData, id: locationId },
                          });
                        }}
                        className="disabled:bg-green-300 cursor-pointer px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300"
                      >
                        {updating ? "Updating" : "Update Location"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default PopularLocation;
