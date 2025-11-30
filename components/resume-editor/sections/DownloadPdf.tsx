import { IResumeData } from "@/types/resumeTypes";
import { pdf } from "@react-pdf/renderer";
import { SetStateAction } from "react";
import { ResumeDocument } from "../../pdf/ResumeDocument";

interface IDownloadPDFProps {
  setIsDownloading: (value: SetStateAction<boolean>) => void;
  resume: IResumeData;
}

const DownloadPDF = async ({ setIsDownloading, resume }: IDownloadPDFProps): Promise<void> => {
  setIsDownloading(true);
  try {
    const filename = `${resume.name.replace(/\s/g, "_")}_Resume.pdf`;
    const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating or downloading PDF:", error);
  } finally {
    setIsDownloading(false);
  }
};

export default DownloadPDF;
