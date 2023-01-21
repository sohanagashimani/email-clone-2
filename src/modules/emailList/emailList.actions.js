import { isNil } from "ramda";
import {
  TOGGLE_FAVORITE_EMAIL,
  SET_SELECTED_EMAIL_REQUEST,
  SET_SELECTED_EMAIL_RESPONSE,
  FETCH_EMAIL_LIST_RESPONSE,
  FETCH_EMAIL_LIST_REQUEST,
} from "./emailList.actionTypes";

export const setSelectedEmail = (email) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_SELECTED_EMAIL_REQUEST,
      });
      if (isNil(email)) {
        dispatch({
          type: SET_SELECTED_EMAIL_RESPONSE,
          email,
        });
      } else {
        const response = await fetch(
          `https://flipkart-email-mock.now.sh/?id=${email.id}`
        );
        const { body } = await response.json();
        email.body = body;
        dispatch({
          type: SET_SELECTED_EMAIL_RESPONSE,
          email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export function fetchEmailList() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EMAIL_LIST_REQUEST,
      });
      const response = await fetch("https://flipkart-email-mock.now.sh/");
      const { list } = await response.json();
      dispatch({
        type: FETCH_EMAIL_LIST_RESPONSE,
        emailList: list,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function toggleFavoriteEmail(email) {
  return {
    type: TOGGLE_FAVORITE_EMAIL,
    email,
  };
}
