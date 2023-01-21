import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { emailListReducer } from "./reducers";

const store = createStore(emailListReducer, applyMiddleware(thunk));

export default store;
