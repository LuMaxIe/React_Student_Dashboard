import { combineReducers } from "@reduxjs/toolkit";
import assignmentScores from "./assignmentScores";
import graphDataState from "./graphDataState";
import graphDisplayState from "./graphDisplayState"

const rootReducer = combineReducers({
  assignmentScores,
  graphDataState,
  graphDisplayState,
})

export default rootReducer