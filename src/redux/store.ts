import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

import { createLogger } from "redux-logger";

const middlewares: any[] = [];

const logger = createLogger({
  level: "info",
  collapsed: true,
});
middlewares.push(logger);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
  devTools: true,
});
