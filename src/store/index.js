import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { loadFromLocalStorage, saveToLocalStorage } from "../@utils";
import { emailListReducer } from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();
const store = createStore(
  emailListReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
