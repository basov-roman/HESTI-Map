import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Marker } from "../../types/types";

interface MarkersState {
  markers: Marker[];
}

const initialState: MarkersState = {
  markers: [],
};

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<Marker>) => {
      state.markers.push(action.payload);
    },
    removeMarker: (state, action: PayloadAction<{ id: string }>) => {
      state.markers = state.markers.filter(
        (marker) => marker.id !== action.payload.id
      );
    },
    updateMarker: (
      state,
      action: PayloadAction<{
        id: string;
        newCoordinates: { lat: number; lng: number };
      }>
    ) => {
      const { id, newCoordinates } = action.payload;
      const marker = state.markers.find((marker) => marker.id === id);
      if (marker) {
        marker.coordinates = newCoordinates;
      }
    },
  },
});

export const { addMarker, removeMarker, updateMarker } = markersSlice.actions;
export default markersSlice.reducer;
