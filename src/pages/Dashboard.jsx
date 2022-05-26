import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import * as HomepageLocationAPI from "../api/HomepageLocation";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";

const Dashboard = () => {
  const toastOptions = {
    style: {
      background: "#04111d",
      color: "#fff",
    },
  };

  const client = useQueryClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [homeLocation, setHomeLocation] = useState("");

  const editSuccess = () => {
    toast.success("Hotel script updated successfully!", toastOptions);
  };

  const errorUpdate = () => {
    toast.error("Error updating hotel script!", toastOptions);
  };

  const { data } = useQuery("homeLocations", () =>
    HomepageLocationAPI.getAllLocationsForHomepage()
  );

  const { mutate: edit, isLoading: updating } = useMutation(
    HomepageLocationAPI.updateHomepageLocation,
    {
      onSuccess: () => {
        client.invalidateQueries("homeLocations");
        editSuccess();
      },
      onError: () => {
        errorUpdate();
      },
    }
  );

  useEffect(() => {
    if (data) {
      setHomeLocation(data[0].locationName);
    }

    return () => {
      setHomeLocation("");
    };
  }, [data]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            {/* <div className="sm:flex sm:justify-end sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton />

                <Datepicker />

                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>
              </div>
            </div> */}
            <div className="sm:flex sm:justify-end sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <input
                  type="text"
                  value={homeLocation}
                  onChange={(e) => setHomeLocation(e.target.value)}
                  className="form-input  text-slate-500 hover:text-slate-600 font-semibold text-xl focus:border-slate-300 w-60"
                />

                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => {
                    edit({
                      variables: {
                        data: {
                          ...data[0],
                          locationName: homeLocation,
                        },
                        id: data[0].locationNameId,
                      },
                    });
                  }}
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />

              <DashboardCard02 />

              <DashboardCard03 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
