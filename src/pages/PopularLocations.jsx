import React, { useState } from "react";
import Modal from "react-modal";
import Header from "../partials/Header";
import AddLocationModal from "../partials/locations/AddLocationModal";
import PopularLocTable from "../partials/locations/PopularLocTable";
import Sidebar from "../partials/Sidebar";
import { XIcon } from "@heroicons/react/solid";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const PopularLocations = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen(!modalIsOpen);
  }

  Modal.setAppElement("#root");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModal}
          style={customStyles}
          contentLabel="Add New Location"
        >
          <div className="flex items-center justify-end">
            <button onClick={handleModal}>
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <AddLocationModal />
        </Modal>
        <main>
          <div className="mt-3 mx-3 2xl:mx-16 px-8 pt-3 flex items-center justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleModal}
            >
              Add New
            </button>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 pb-8 w-full max-w-9xl mx-auto">
            <PopularLocTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PopularLocations;
