import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/sagas/actions";
import { ApiServices } from "./httpServices";

export const instance = axios.create({
  withCredentials: true,
  credentials: "include",
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api/",
});

export const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    let interceptorReq;
    let interceptorRes;
    if (!ran) {
      // Add a request interceptor
      interceptorReq = instance.interceptors.request.use(
        function (config) {
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );

      // Add a response interceptor
      interceptorRes = instance.interceptors.response.use(
        function (response) {
          return response;
        },
        async function (error) {
          const originalRequest = error.config;

          if (
            error.response.status === 401 &&
            originalRequest.url === `auth/token`
          ) {
            const payload = {
              url: "auth/logout",
            };
            dispatch(LOGOUT(payload));
            navigate("/auth/login");
            return Promise.reject(error);
          }
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const res = await ApiServices("auth/token").get();
            if (res.status === 201 || res.status === 200) {
              return instance(originalRequest);
            }
          }
          return Promise.reject(error);
        }
      );
      setRan(true);
    }

    return () => {
      instance.interceptors.response.eject(interceptorReq);
      instance.interceptors.response.eject(interceptorRes);
    };
  }, []);

  return <></>;
};

export const del = (url) => instance.delete(url);

export const get = ({ url }) => instance.get(url);

export const put = ({ url, data }) => instance.put(url, data);

export const post = ({ url, data }) => instance.post(url, data);

export const patch = ({ url, data }) => instance.patch(url, data);
