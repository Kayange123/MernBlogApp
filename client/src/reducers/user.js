import { GET_USER_BY_ID } from "../constants/actionTypes";

const user = (state = { userData: null }, action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return { ...state, userData: action?.data };

    default:
      return state;
  }
};
export default user;