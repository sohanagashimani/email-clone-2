import { isNil } from "ramda";
import { updateEmailList } from "../../@utils";
import {
  FETCH_EMAIL_LIST_REQUEST,
  FETCH_EMAIL_LIST_RESPONSE,
  RESET_SELECTED_EMAIL,
  SET_SELECTED_EMAIL_REQUEST,
  SET_SELECTED_EMAIL_RESPONSE,
  TOGGLE_FAVORITE_EMAIL,
} from "./emailList.actionTypes";

const initialState = {
  emailList: [],
  selectedEmail: null,
  isFetching: false,
  isFetchingDetails: false,
  currentPage: 1,
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
        currentPage: action.currentPage,
      };
    case SET_SELECTED_EMAIL_REQUEST:
      return {
        ...state,
        isFetchingDetails: true,
      };

    case SET_SELECTED_EMAIL_RESPONSE:
      if (isNil(action.email)) {
        return {
          ...state,
          selectedEmail: action.email,
          isFetchingDetails: false,
        };
      }
      return updateEmailList(
        state,
        action.email,
        "isRead",
        true,
        false,
        state.isFetching
      );
    case RESET_SELECTED_EMAIL:
      return {
        ...state,
        selectedEmail: action.email,
        isFetchingDetails: false,
      };

    case TOGGLE_FAVORITE_EMAIL:
      return updateEmailList(
        state,
        action.email,
        "isFavorite",
        !action.email.isFavorite,
        state.isFetchingDetails,
        state.isFetching
      );

    default:
      return state;
  }
}

export default rootReducer;
