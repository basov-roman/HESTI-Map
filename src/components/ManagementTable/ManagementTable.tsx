import "./ManagementTable.css";
import SearchInput from "../SearchInput/SearchInput";
import PolygonsMarkersManagement from "../PolygonsMarkersManagement/PolygonsMarkersManagement";

const ManagementTable = () => {
  return (
    <div className="management-table-wrapper">
      <div className="input-container">
        <SearchInput />
      </div>

      <PolygonsMarkersManagement />
    </div>
  );
};

export default ManagementTable;
