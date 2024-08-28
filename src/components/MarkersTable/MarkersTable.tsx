import "./MarkersTable.css";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

const MarkersTable = () => {
  const markers = useSelector((state: RootState) => state.markers.markers);

  const [nameSortOrder, setNameSortOrder] = useState<"asc" | "desc">("desc");
  const [coordinatesSortOrder, setCoordinatesSortOrder] = useState<
    "asc" | "desc"
  >("desc");

  const handleNameSort = () => {
    setNameSortOrder(nameSortOrder === "asc" ? "desc" : "asc");
  };

  const handleCoordinatesSort = () => {
    setCoordinatesSortOrder(coordinatesSortOrder === "asc" ? "desc" : "asc");
  };

  const sortedMarkers = [...markers].sort((a, b) => {
    if (nameSortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const sortedMarkersByCoordinates = sortedMarkers.sort((a, b) => {
    const aCoordSum = a.coordinates.lat + a.coordinates.lng;
    const bCoordSum = b.coordinates.lat + b.coordinates.lng;
    if (coordinatesSortOrder === "asc") {
      return aCoordSum - bCoordSum;
    } else {
      return bCoordSum - aCoordSum;
    }
  });

  return (
    <table className="markers-table">
      <thead>
        <tr>
          <th onClick={handleNameSort} className="name">
            <div className="content">
              <span>Name</span>
              {nameSortOrder === "asc" ? (
                <GoSortAsc className="icon" />
              ) : (
                <GoSortDesc className="icon" />
              )}
            </div>
          </th>
          <th onClick={handleCoordinatesSort} className="coordinates">
            <div className="content">
              <span>Coordinates</span>
              {coordinatesSortOrder === "asc" ? (
                <GoSortAsc className="icon" />
              ) : (
                <GoSortDesc className="icon" />
              )}
            </div>
          </th>
          <th className="action">Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedMarkersByCoordinates.map((marker) => (
          <tr key={marker.id}>
            <td>{marker.name}</td>
            <td>
              {`(${marker.coordinates.lat.toFixed(
                4
              )}, ${marker.coordinates.lng.toFixed(4)})`}
            </td>
            <td>
              <BsThreeDotsVertical />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MarkersTable;
