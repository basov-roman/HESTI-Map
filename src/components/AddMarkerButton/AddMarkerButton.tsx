import "./AddMarkerButton.css";
import { PiMapPinLine } from "react-icons/pi";

interface AddMarkerButtonProps {
  isAdding: boolean;
  toggleAddingMode: () => void;
}

const AddMarkerButton: React.FC<AddMarkerButtonProps> = ({
  isAdding,
  toggleAddingMode,
}) => {
  return (
    <button className="add-marker-button-wrapper" onClick={toggleAddingMode}>
      <PiMapPinLine className="icon" />
      <span>{isAdding ? "Cancel Adding" : "Add Marker"}</span>
    </button>
  );
};

export default AddMarkerButton;
