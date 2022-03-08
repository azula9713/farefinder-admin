import React, { useState } from "react";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import * as HotelScriptsAPI from "../../api/HotelScriptsAPI";
import { useRecoilValue } from "recoil";
import { hotelScriptsAtom } from "../../atoms/hotelScriptsAtom";

const toastOptions = {
  style: {
    background: "#04111d",
    color: "#fff",
  },
};

const AddHotelScriptModal = () => {
  const hotelScripts = useRecoilValue(hotelScriptsAtom);

  const [hotelName, setHotelName] = useState("");
  const [script, setScript] = useState("");
  const [activeDefault, setActiveDefault] = useState(false);

  const { mutate, isLoading } = useMutation(
    HotelScriptsAPI.createNewHotelScript,
    {
      onSuccess: (data) => {
        // [TODO]:Add the toast
      },
    }
  );

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center font-bold text-black">Add New Hotel Script</h2>
      <div>
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-6">
            <div className="sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="location-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Hotel Title
                    </label>
                    <input
                      type="text"
                      value={hotelName}
                      onChange={(e) => {
                        setHotelName(e.target.value);
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
                    Script
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      value={script}
                      onChange={(e) => {
                        setScript(e.target.value);
                      }}
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Paste the src of the script here"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="active-loc"
                      name="active-loc"
                      value={activeDefault}
                      checked={activeDefault}
                      onChange={() => {
                        if (!activeDefault && hotelScripts.length < 3) {
                          setActiveDefault(true);
                        } else if (activeDefault) {
                          setActiveDefault(false);
                        } else {
                          toast.error(
                            "Cannot set more than 3 active hotels at once",
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
                      Make Active Script
                    </label>
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
              hotelName,
              scriptSource: script,
              isActive: activeDefault,
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

export default AddHotelScriptModal;
