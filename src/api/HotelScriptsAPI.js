import Api from "./Axios";

const getAllHotelScripts = async () => {
  try {
    const res = await Api.get("/hotel-scripts/all");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const getSelectedHotelScript = async (id) => {
  try {
    const res = await Api.get(`/hotel-scripts/view/${id}`, {
      headers: {
        "x-refresh": localStorage.getItem("token"),
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const createNewHotelScript = async (data) => {
  try {
    const res = await Api.post("/hotel-scripts/create", data, {
      headers: {
        "x-refresh": localStorage.getItem("token"),
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteSelectedHotelScript = async (id) => {
  try {
    const res = await Api.delete(`/hotel-scripts/delete/${id}`, {
      headers: {
        "x-refresh": localStorage.getItem("token"),
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const updateSelectedHotelScript = async (data) => {
  try {
    const res = await Api.put(
      `/hotel-scripts/update/${data.variables.id}`,
      data.variables.data,
      {
        headers: {
          "x-refresh": localStorage.getItem("token"),
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  getAllHotelScripts,
  getSelectedHotelScript,
  createNewHotelScript,
  updateSelectedHotelScript,
  deleteSelectedHotelScript,
};
