import { clearUser } from "../reducers/userReducer";

export const setupInterceptors = (API, store) => {
  API.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        store.dispatch(clearUser());
      }
      return Promise.reject(err);
    },
  );
};
