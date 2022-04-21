import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { XIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { PencilIcon } from "@heroicons/react/outline";
import { hotelScriptsAtom } from "../../atoms/hotelScriptsAtom";
import * as HotelScriptAPI from "../../api/HotelScriptsAPI";
import DeleteModal from "../DeleteModal";
import EditScriptModal from "./EditScriptModal";

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

const deleteModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "none",
    border: "none",
  },
};

const toastOptions = {
  style: {
    background: "#04111d",
    color: "#fff",
  },
};

const HotelScriptTable = () => {
  const client = useQueryClient();
  const [hotelScripts, setHotelScripts] = useRecoilState(hotelScriptsAtom);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedHotelScript, setSelectedHotelScript] = useState(null);

  const deleteSuccess = () => {
    toast.success("Hotel script deleted successfully!", toastOptions);
  };

  const editSuccess = () => {
    toast.success("Hotel script updated successfully!", toastOptions);
  };

  const errorUpdate = () => {
    toast.error("Error updating hotel script!", toastOptions);
  };

  const errorDelete = () => {
    toast.error("Unable to delete hotel script", toastOptions);
  };

  const maximumValidErrorToast = () => {
    toast.error("Cannot set more than 3 active hotels at once", toastOptions);
  };

  const { data } = useQuery("hotelscripts", () =>
    HotelScriptAPI.getAllHotelScripts()
  );

  const { mutate: edit, isLoading: updating } = useMutation(
    HotelScriptAPI.updateSelectedHotelScript,
    {
      onSuccess: () => {
        handleEditModal();
        client.invalidateQueries("hotelscripts");
        editSuccess();
      },
      onError: () => {
        handleEditModal();
        errorUpdate();
      },
    }
  );

  const { mutate: deleteScript, isLoading: deleting } = useMutation(
    HotelScriptAPI.deleteSelectedHotelScript,
    {
      onSuccess: () => {
        client.invalidateQueries("hotelscripts");
        deleteSuccess();
        handleDeleteModal();
      },
      onError: () => {
        handleDeleteModal();
        errorDelete();
      },
    }
  );

  Modal.setAppElement("#root");

  function handleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleDeleteModal() {
    setDeleteModalOpen(!deleteModalOpen);
  }

  useEffect(() => {
    if (data?.length > 0) {
      setHotelScripts(data);
    }
  }, [data]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={handleDeleteModal}
        style={deleteModalStyles}
        contentLabel="Delete Hotel Script"
      >
        <DeleteModal
          close={handleDeleteModal}
          id={selectedId}
          action={deleteScript}
          state={deleting}
        />
      </Modal>
      <Modal
        isOpen={editModalOpen}
        onRequestClose={handleEditModal}
        style={customStyles}
        contentLabel="Delete Hotel Script"
      >
        <div className="flex items-center justify-end">
          <button onClick={handleEditModal}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <EditScriptModal
          edit={edit}
          loading={updating}
          maximumErrorToast={maximumValidErrorToast}
          hotelScript={selectedHotelScript}
        />
      </Modal>
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
                            <PencilIcon
                              onClick={() => {
                                setSelectedHotelScript(script);
                                handleEditModal();
                              }}
                            />
                          </div>
                          <div
                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            onClick={() => {
                              setSelectedId(script.hotelScriptId);
                              handleDeleteModal();
                            }}
                          >
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
