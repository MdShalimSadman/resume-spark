// components/pdf/GlobeIconPDF.tsx
import { FC } from "react";
import { Svg, Circle, Path } from "@react-pdf/renderer";

interface GlobeIconPDFProps {
  size?: number;
  color?: string;
}

const GlobeIconPDF: FC<GlobeIconPDFProps> = ({ size = 24, color = "black" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <Path d="M2 12h20" />
    </Svg>
  );
};

export default GlobeIconPDF;
