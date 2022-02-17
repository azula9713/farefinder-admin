import Api from "./Axios";

const getAllPopularLocations = async () => {
  try {
    const res = await Api.get("/popular-locations");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const getSelectedPopularLocation = async (id) => {
  try {
    const res = await Api.get(`/popular-locations/${id}`, {
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

export {
  getAllPopularLocations,
  getSelectedPopularLocation,
  createNewPopularLocation,
};
