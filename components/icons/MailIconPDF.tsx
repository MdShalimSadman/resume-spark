import { FC } from "react";
import { Svg, Path, Rect } from "@react-pdf/renderer";

interface MailIconPDFProps {
  size?: number;
  color?: string;
}

const MailIconPDF: FC<MailIconPDFProps> = ({ size = 24, color = "black" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <Path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <Rect x={2} y={4} width={20} height={16} rx={2} />
    </Svg>
  );
};

export default MailIconPDF;
