import "./SearchInput.css";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { useState } from "react";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-input-wrapper">
      <div className="search-input-container">
        <IoIosSearch className="search-icon icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search on map"
        />
        {searchTerm && (
          <IoMdClose className="close-icon icon" onClick={handleClear} />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
