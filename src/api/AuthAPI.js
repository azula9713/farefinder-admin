import Api from "./Axios";

const loginUser = async ({ email, password }) => {
  try {
    const res = await Api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const logoutUser = async () => {
  try {
    const res = await Api.patch("/auth/logout");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export { loginUser, logoutUser };
