import { get, put, post, del, patch } from "./index";

let resObj = {
  data: "",
  success: false,
  message: "",
  status: "",
};

export const ApiServices = {
  post: async (payload) => {
    await post(payload)
      .then((res) => {
        if (res.data?.result) {
          resObj.data = res.data?.data;
          resObj.success = true;
          resObj.message = res.data?.message;
        } else {
          resObj.message = res.data?.message;
        }
        resObj.status = res.status;
      })
      .catch((error) => {
        resObj.message = error.res?.data?.message;
        resObj.status = error.res.status;
      });
  },
  get: async () => {},
  put: async () => {},
  delete: async () => {},
  patch: async () => {},
};
