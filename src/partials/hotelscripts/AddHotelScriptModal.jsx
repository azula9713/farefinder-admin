import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as HotelScriptsAPI from "../../api/HotelScriptsAPI";
import { useRecoilValue } from "recoil";
import { hotelScriptsAtom } from "../../atoms/hotelScriptsAtom";

const AddHotelScriptModal = ({ close, maximumErrorToast, successToast }) => {
  const client = useQueryClient();
  const hotelScripts = useRecoilValue(hotelScriptsAtom);

  const [hotelName, setHotelName] = useState("");
  const [script, setScript] = useState("");
  const [activeDefault, setActiveDefault] = useState(false);

  const { mutate, isLoading } = useMutation(
    HotelScriptsAPI.createNewHotelScript,
    {
      onSuccess: () => {
        //invalidate cache
        successToast();
        client.invalidateQueries("hotelscripts");
        close();
      },
    }
  );

  return (
    <div>
      <h2 className="text-center font-bold text-black">Add New Hotel Script</h2>
      <div>
        <div className="w-full">
          <div className="mt-5 md:mt-0 w-full">
            <div className="sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <label
                      htmlFor="location-name"
                      className="block text-sm font-medium text-gray-700 whitespace-nowrap"
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
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-56"
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center space-x-4">
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
                      rows={9}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-56"
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
                        } else if (!activeDefault && hotelScripts.length >= 3) {
                          maximumErrorToast();
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
          {isLoading ? "Saving Script..." : "Save Script"}
        </button>
      </div>
    </div>
  );
};

export default AddHotelScriptModal;
