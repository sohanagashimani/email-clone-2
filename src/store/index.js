import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { emailListReducer } from "./reducers";
function saveToLocalStorage(state) {
  try {
    localStorage.setItem("emailList", JSON.stringify(state.emailList));
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStorage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const persistedState = localStorage.getItem("emailList");
    if (persistedState === null || persistedState.length === 0)
      return undefined;
    return JSON.parse(persistedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();
const store = createStore(
  emailListReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
