import { FC } from "react";
import { Svg, Path, Circle } from "@react-pdf/renderer";

interface MapPinIconPDFProps {
  size?: number;
  color?: string;
}

const MapPinIconPDF: FC<MapPinIconPDFProps> = ({ size = 24, color = "black" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <Path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <Circle cx={12} cy={10} r={3} />
    </Svg>
  );
};

export default MapPinIconPDF;
