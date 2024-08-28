import "./PolygonsTable.css";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

const PolygonsTable = () => {
  const polygons = useSelector((state: RootState) => state.polygons.polygons);

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

  const sortedPolygons = [...polygons].sort((a, b) => {
    if (nameSortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const sortedPolygonsByCoordinates = sortedPolygons.sort((a, b) => {
    const aCoordsLength = a.coordinates.length;
    const bCoordsLength = b.coordinates.length;
    if (coordinatesSortOrder === "asc") {
      return aCoordsLength - bCoordsLength;
    } else {
      return bCoordsLength - aCoordsLength;
    }
  });

  return (
    <table className="polygons-table">
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
        {sortedPolygonsByCoordinates.map((polygon) => (
          <tr key={polygon.id}>
            <td>{polygon.name}</td>
            <td>
              {polygon.coordinates
                .map(
                  (coord) =>
                    `(${coord.lat.toFixed(4)}, ${coord.lng.toFixed(4)})`
                )
                .join(", ")}
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

export default PolygonsTable;
