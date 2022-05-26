import Api from "./Axios";

const getAllLocationsForHomepage = async () => {
  try {
    const res = await Api.get("/home-location/all");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const updateHomepageLocation = async (data) => {
  try {
    const res = await Api.put(
      `/home-location/update/${data.variables.id}`,
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

// const createNewHomepageLocation = async (data) => {};

export { getAllLocationsForHomepage, updateHomepageLocation };
