import "./PolygonsMarkersManagement.css";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import PolygonsTable from "../PolygonsTable/PolygonsTable";
import MarkersTable from "../MarkersTable/MarkersTable";

const PolygonsMarkersManagement = () => {
  const [sectionManagement, setSectionManagement] =
    useState<string>("polygons");

  const handlePolygonsClick = () => {
    setSectionManagement("polygons");
  };

  const handleMarkersClick = () => {
    setSectionManagement("markers");
  };

  return (
    <div className="polygons-markers-management-wrapper">
      <div className="polygons-markers-management-wrapper-header">
        <nav>
          <button
            onClick={handlePolygonsClick}
            className={sectionManagement === "polygons" ? "active" : ""}
          >
            Polygons Management
          </button>
          <button
            onClick={handleMarkersClick}
            className={sectionManagement === "markers" ? "active" : ""}
          >
            Markers Management
          </button>
        </nav>

        <button disabled={true} className="download-btn">
          <FiDownload className="icon" />
          <span className="button-text">Download</span>
        </button>
      </div>

      <div className="tables-container">
        {sectionManagement === "polygons" && <PolygonsTable />}
        {sectionManagement === "markers" && <MarkersTable />}
      </div>
    </div>
  );
};

export default PolygonsMarkersManagement;
