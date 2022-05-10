import { combineReducers } from "@reduxjs/toolkit";
import songTracker from "./songTracker";

const rootReducer = combineReducers({
  songTracker,
})

export default rootReducer