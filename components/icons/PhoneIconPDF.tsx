import { FC } from "react";
import { Svg, Path } from "@react-pdf/renderer";

interface PhoneIconPDFProps {
  size?: number;
  color?: string;
}

const PhoneIconPDF: FC<PhoneIconPDFProps> = ({ size = 24, color = "black" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <Path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </Svg>
  );
};

export default PhoneIconPDF;
