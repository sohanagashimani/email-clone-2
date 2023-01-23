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

      // Check if email details is already stored in localStorage
      let emailDetails = localStorage.getItem(`emailDetails-${email.id}`);
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
        // Store email details in localStorage
        localStorage.setItem(`emailDetails-${email.id}`, JSON.stringify(email));
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

export function fetchEmailList(page = 1) {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EMAIL_LIST_REQUEST,
      });
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?page=${page}`
      );
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
  localStorage.setItem(
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
