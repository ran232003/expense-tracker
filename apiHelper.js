// src/utils/apiHelper.js

import { useDispatch } from "react-redux";
import { apiCall } from "./apiCall";
import { loadingAction } from "./store/gameSlice";
import { bannerAction } from "./store/bannerSlice";
//import { loadingAction } from "../store/loadingData";

export const useApiHelper = () => {
  const dispatch = useDispatch();

  const handleApiCall = async (
    method,
    url,
    body,
    onSuccess,
    onFailure,
    componentAction,
    dealy
  ) => {
    //dispatch(loadingAction.toggleLoading(true));
    dispatch(loadingAction.setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, (dealy = 1000)));
    try {
      const data = await apiCall(method, url, body);
      console.log("data = ", data);
      if (data.status === "ok") {
        console.log("before showBanner");
        dispatch(
          bannerAction.showBanner({
            status: "success",
            message: "Operation successful!",
          })
        );
        onSuccess(data);
      } else {
        console.log("else ", data);

        dispatch(
          bannerAction.showBanner({
            status: "error",
            message: "Somthing Went Wrong",
          })
        );
        if (onFailure) {
          console.log("onFailure ");

          dispatch(loadingAction.setLoading(false));

          onFailure(data);
        }
      }
    } catch (error) {
      console.log("error ");

      dispatch(
        bannerAction.showBanner({
          status: "error",
          message: "Somthing Went Wrong",
        })
      );
      console.error(error);
      if (onFailure) onFailure(error);
    } finally {
      console.log("finally ");

      // dispatch(loadingAction.toggleLoading(false));
      dispatch(loadingAction.setLoading(false));
    }
  };

  return { handleApiCall };
};
