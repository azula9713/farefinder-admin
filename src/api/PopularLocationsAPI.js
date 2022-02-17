import Api from "./Axios";

const getAllPopularLocations = async () => {
  try {
    const res = await Api.get("/popular-locations/all");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const getSelectedPopularLocation = async (id) => {
  try {
    const res = await Api.get(`/popular-locations/view/${id}`, {
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

const createNewPopularLocation = async (data) => {
  try {
    const res = await Api.post("/popular-locations/create", data, {
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

const deleteSelectedPopularLocation = async (id) => {
  try {
    const res = await Api.delete(`/popular-locations/delete/${id}`, {
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

const updateSelectedPopularLocation = async (data) => {
  console.log("data", data.variables.id);
  try {
    const res = await Api.put(
      `/popular-locations/update/${data.variables.id}`,
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
  getAllPopularLocations,
  getSelectedPopularLocation,
  createNewPopularLocation,
  updateSelectedPopularLocation,
  deleteSelectedPopularLocation,
};
