import "./Map.css";
import {
  GoogleMap,
  LoadScript,
  Marker as GoogleMarker,
  Polygon as GooglePolygon,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { addMarker } from "../../store/slices/markersSlice";
import { addPolygon } from "../../store/slices/polygonsSlice";
import { RootState } from "../../store/store";
import AddMarkerButton from "../AddMarkerButton/AddMarkerButton";
import DrawPolygonButton from "../DrawPolygonButton/DrawPolygonButton";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const MAP_STYLES = {
  height: "100%",
  width: "100%",
};
const DEFAULT_CENTER = {
  lat: 40.712776,
  lng: -74.005974,
};

const Map = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.markers.markers);
  const polygons = useSelector((state: RootState) => state.polygons.polygons);

  const [isAdding, setIsAdding] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState<google.maps.LatLng[]>(
    []
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const toggleAddingMode = () => {
    setIsAdding(!isAdding);
  };

  const toggleDrawingMode = () => {
    setIsDrawing(!isDrawing);
    if (isDrawing && currentPolygon.length > 2) {
      const newPolygon = {
        id: Date.now().toString(),
        name: "New Polygon",
        coordinates: currentPolygon.map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        })),
      };
      dispatch(addPolygon(newPolygon));
      setCurrentPolygon([]);
    }
  };

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (isAdding && event.latLng) {
        const newMarker = {
          id: Date.now().toString(),
          name: "New Marker",
          coordinates: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          },
        };
        dispatch(addMarker(newMarker));
        setIsAdding(false);
      }

      if (isDrawing && event.latLng) {
        setCurrentPolygon((prev) =>
          [...prev, event.latLng].filter((latLng) => latLng !== null)
        );
      }
    },
    [isAdding, isDrawing, dispatch]
  );

  useEffect(() => {
    if (map) {
      map.addListener("click", handleMapClick);
    }

    return () => {
      if (map) {
        google.maps.event.clearListeners(map, "click");
      }
    };
  }, [map, handleMapClick]);

  return (
    <div className="map-wrapper">
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={MAP_STYLES}
          zoom={13}
          center={DEFAULT_CENTER}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {markers.map((marker) => (
            <GoogleMarker key={marker.id} position={marker.coordinates} />
          ))}
          {polygons.map((polygon) => (
            <GooglePolygon
              key={polygon.id}
              path={polygon.coordinates.map((coord) => ({
                lat: coord.lat,
                lng: coord.lng,
              }))}
              options={{
                fillColor: "lightblue",
                fillOpacity: 0.5,
                strokeColor: "blue",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          ))}
          {isDrawing && currentPolygon.length > 0 && (
            <GooglePolygon
              path={currentPolygon.map((latLng) => ({
                lat: latLng.lat(),
                lng: latLng.lng(),
              }))}
              options={{
                fillColor: "transparent",
                strokeColor: "red",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      <div className="button-container">
        <AddMarkerButton
          isAdding={isAdding}
          toggleAddingMode={toggleAddingMode}
        />
        <DrawPolygonButton
          isDrawing={isDrawing}
          toggleDrawingMode={toggleDrawingMode}
        />
      </div>
    </div>
  );
};

export default Map;
