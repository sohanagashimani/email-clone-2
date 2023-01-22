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
        // Check if email details is already stored in sessionStorage
        let emailDetails = sessionStorage.getItem(`emailDetails-${email.id}`);
        if (emailDetails) {
          // If email details is stored, parse it to JSON and dispatch
          emailDetails = JSON.parse(emailDetails);
          dispatch({
            type: SET_SELECTED_EMAIL_RESPONSE,
            email: emailDetails,
          });
        } else {
          const response = await fetch(
            `https://flipkart-email-mock.now.sh/?id=${email.id}`
          );
          const { body } = await response.json();
          email.body = body;
          // Store email details in sessionStorage
          sessionStorage.setItem(
            `emailDetails-${email.id}`,
            JSON.stringify(email)
          );
          dispatch({
            type: SET_SELECTED_EMAIL_RESPONSE,
            email,
          });
        }
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
      // Check if email list is already stored in sessionStorage
      let emailList = sessionStorage.getItem("emailList");
      if (emailList) {
        // If email list is stored, parse it to JSON and dispatch
        emailList = JSON.parse(emailList);
        dispatch({
          type: FETCH_EMAIL_LIST_RESPONSE,
          emailList,
        });
      } else {
        // If email list is not stored, fetch from API
        const response = await fetch("https://flipkart-email-mock.now.sh/");
        const { list } = await response.json();
        // Store email list in sessionStorage
        sessionStorage.setItem("emailList", JSON.stringify(list));
        dispatch({
          type: FETCH_EMAIL_LIST_RESPONSE,
          emailList: list,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function toggleFavoriteEmail(email) {
  sessionStorage.setItem(
    `emailDetails-${email.id}`,
    JSON.stringify({
      ...email,
      isFavorite: !email.isFavorite,
    })
  );
  return {
    type: TOGGLE_FAVORITE_EMAIL,
    email,
  };
}
