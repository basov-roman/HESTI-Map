import { configureStore } from "@reduxjs/toolkit";
import polygonsReducer from "./slices/polygonsSlice";
import markersReducer from "./slices/markersSlice";

const store = configureStore({
  reducer: {
    polygons: polygonsReducer,
    markers: markersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
