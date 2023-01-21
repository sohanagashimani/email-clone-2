import { isNil } from "ramda";
import {
  FETCH_EMAIL_LIST_REQUEST,
  FETCH_EMAIL_LIST_RESPONSE,
  SET_SELECTED_EMAIL_REQUEST,
  SET_SELECTED_EMAIL_RESPONSE,
  TOGGLE_FAVORITE_EMAIL,
} from "./emailList.actionTypes";

const initialState = {
  emailList: [],
  selectedEmail: null,
  isFetching: false,
  isFetchingDetails: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMAIL_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_EMAIL_LIST_RESPONSE:
      return {
        ...state,
        isFetching: false,
        emailList: action.emailList,
      };
    case SET_SELECTED_EMAIL_REQUEST:
      return {
        ...state,
        isFetchingDetails: true,
      };

    case SET_SELECTED_EMAIL_RESPONSE:
      if (isNil(action.email))
        return {
          ...state,
          selectedEmail: action.email,
          isFetchingDetails: false,
        };

      return {
        ...state,
        selectedEmail: action.email,
        emailList: state.emailList.map((email) =>
          email.id === action.email.id ? { ...email, isRead: true } : email
        ),
        isFetchingDetails: false,
      };
    case TOGGLE_FAVORITE_EMAIL:
      return {
        ...state,
        selectedEmail: {
          ...state.selectedEmail,
          isFavorite: !state.selectedEmail.isFavorite,
        },
        emailList: state.emailList.map((email) =>
          email.id === action.email.id
            ? { ...email, isFavorite: !email.isFavorite }
            : email
        ),
      };
    default:
      return state;
  }
}

export default rootReducer;
