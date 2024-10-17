import { combineReducers } from "@reduxjs/toolkit";
import userInformationReducer from "./slice/userInformation";
import categoryInformationReducer from "./slice/categorySlice";

const rootReducer = combineReducers({
  userInformation: userInformationReducer,
  categoryInformation: categoryInformationReducer,
});

export default rootReducer;
