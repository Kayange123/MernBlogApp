import * as api from "../apis/index";
import { GET_USER_BY_ID } from "../constants/actionTypes";

export const fetchUserById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserById(id);
    dispatch({ type: GET_USER_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};
