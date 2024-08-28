import "./DrawPolygonButton.css";
import { PiPencilLineBold } from "react-icons/pi";

interface DrawPolygonButtonProps {
  isDrawing: boolean;
  toggleDrawingMode: () => void;
}

const DrawPolygonButton = ({
  isDrawing,
  toggleDrawingMode,
}: DrawPolygonButtonProps) => {
  return (
    <button className="draw-polygon-button-wrapper" onClick={toggleDrawingMode}>
      <PiPencilLineBold className="icon" />
      <span>{isDrawing ? "Cancel Drawing" : "Draw Polygon"}</span>
    </button>
  );
};

export default DrawPolygonButton;
