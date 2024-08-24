import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Polygon } from "../../types/types";

interface PolygonsState {
  polygons: Polygon[];
}

const initialState: PolygonsState = {
  polygons: [],
};

const polygonsSlice = createSlice({
  name: "polygons",
  initialState,
  reducers: {
    addPolygon: (state, action: PayloadAction<Polygon>) => {
      state.polygons.push(action.payload);
    },
    removePolygon: (state, action: PayloadAction<{ id: string }>) => {
      state.polygons = state.polygons.filter(
        (polygon) => polygon.id !== action.payload.id
      );
    },
  },
});

export const { addPolygon, removePolygon } = polygonsSlice.actions;
export default polygonsSlice.reducer;
