import Api from "./Axios";

const getAllPopularLocations = async () => {
  try {
    const res = await Api.get("/popular-locations");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export { getAllPopularLocations };
