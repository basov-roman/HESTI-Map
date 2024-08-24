import "./MainWrapper.css";
import ManagementTable from "../ManagementTable/ManagementTable";
import Map from "../Map/Map";

const MainWrapper = () => {
  return (
    <main className="main-wrapper">
      <Map />
      <ManagementTable />
    </main>
  );
};

export default MainWrapper;
