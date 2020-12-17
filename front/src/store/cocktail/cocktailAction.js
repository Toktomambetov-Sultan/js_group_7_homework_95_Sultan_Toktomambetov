import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SET_COCKTAILS,
} from "./../actionsTypes";
import axiosOrder from "./../../axiosOrder";

const  fetchRequest= () => {
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
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.get("/cocktails/all");
      dispatch(setCocktails(response.data));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
