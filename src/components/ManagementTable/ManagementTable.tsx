import "./ManagementTable.css";
import SearchInput from "../SearchInput/SearchInput";

const ManagementTable = () => {
  return (
    <div className="management-table-wrapper">
      <div className="input-container">
        <SearchInput />
      </div>
    </div>
  );
};

export default ManagementTable;
