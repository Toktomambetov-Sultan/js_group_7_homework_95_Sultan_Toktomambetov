import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SET_COCKTAILS,
} from "./../actionsTypes";
import axiosOrder from "./../../axiosOrder";
import jsonToFormData from "./../../tools/FormDataTools/jsonToFormData";
import { push } from "connected-react-router";

const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};
const fetchSuccess = () => {
  return { type: FETCH_SUCCESS };
};
const fetchError = (error) => {
  return { type: FETCH_ERROR, error };
};
const setCocktails = (data) => {
  return { type: SET_COCKTAILS, data };
};

export const getCocktails = () => {
  return async (dispatch, getState) => {
    dispatch(fetchRequest());
    const headers = {
      Authorization: getState().user.user?.token,
    };
    try {
      const response = await axiosOrder.get("/cocktails/all", { headers });
      dispatch(setCocktails(response.data));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
export const postCocktail = (data) => {
  return async (dispatch, getState) => {
    dispatch(fetchRequest());

    try {
      const formData = jsonToFormData(data);
      const headers = {
        Authorization: getState().user.user?.token,
      };
      await axiosOrder.post("/cocktails/", formData, {
        headers,
      });
      const response = await axiosOrder.get("/cocktails/all");
      dispatch(setCocktails(response.data));
      dispatch(push("/cocktails/my"));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error.response.data));
    }
  };
};
