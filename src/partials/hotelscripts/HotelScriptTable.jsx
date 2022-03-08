import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { EyeIcon, PencilIcon } from "@heroicons/react/outline";
import { hotelScriptsAtom } from "../../atoms/hotelScriptsAtom";
import * as HotelScriptAPI from "../../api/HotelScriptsAPI";

const HotelScriptTable = () => {
  const navigate = useNavigate();
  const [hotelScripts, setHotelScripts] = useRecoilState(hotelScriptsAtom);

  const { data, isLoading } = useQuery("hotelscripts", () =>
    HotelScriptAPI.getAllHotelScripts()
  );

  useEffect(() => {
    if (data?.length > 0) {
      setHotelScripts(data);
    }
  }, [data]);

  return (
    <>
      {/* [TODO]:Add Loader */}
      <div className="overflow-x-auto">
        <div className="min-w-screen bg-gray-100 flex items-center justify-center font-sans lg:overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Hotel</th>
                    <th className="py-3 px-6 text-left">Created By</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light">
                  {hotelScripts.map((script) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={script.hotelScriptId}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">
                            {script.hotelName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src="https://randomuser.me/api/portraits/men/1.jpg"
                            />
                          </div>
                          <span>{script.createdBy}</span>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <span
                          className={` ${
                            script.isActive
                              ? "bg-green-200 text-green-600"
                              : "bg-purple-200 text-purple-600"
                          }  py-1 px-3 rounded-full text-xs`}
                        >
                          {script.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <EyeIcon
                              onClick={() => {
                                navigate(
                                  `/hotelscripts/${script.hotelScriptId}`
                                );
                              }}
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <PencilIcon />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelScriptTable;
