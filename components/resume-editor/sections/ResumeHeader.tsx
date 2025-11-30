import Link from "next/link";
import Image from "next/image";
import { Bot, Download, Edit3, Eye } from "lucide-react";
import { FC, SetStateAction } from "react";

interface IResumeHeaderProps {
  setViewMode: (value: SetStateAction<"edit" | "preview">) => void;
  viewMode: "edit" | "preview";
  handleDownloadPDF: () => Promise<void>;
  isDownloading: boolean;
  handleCheckATS: () => Promise<void>;
  isAtsLoading: boolean;
}

const ResumeHeader: FC<IResumeHeaderProps> = ({
  setViewMode,
  viewMode,
  handleDownloadPDF,
  isDownloading,
  handleCheckATS,
  isAtsLoading,
}) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src="/images/logo-black.png"
          width={150}
          height={150}
          priority
          alt="logo"
        />
      </Link>
      <div className="flex gap-2">
        <div className="bg-white shadow-sm rounded-full p-1 flex">
          <button
            onClick={() => setViewMode("edit")}
            className={`px-3 py-2 cursor-pointer rounded-full flex items-center gap-2 transition ${
              viewMode === "edit"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-3 py-2 cursor-pointer rounded-full flex items-center gap-2 transition ${
              viewMode === "preview"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Eye size={18} />
          </button>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="px-4 shadow-sm py-2 rounded-lg flex items-center gap-2 transition bg-white text-orange-600 border border-orange-600  hover:text-white hover:bg-orange-600 disabled:bg-orange-300 disabled:border-orange-300 disabled:text-white transition-all duration-200 cursor-pointer"
          disabled={isDownloading}
        >
          <Download size={18} />
          {isDownloading ? "Generating..." : "Download "}
        </button>
        <button
          onClick={handleCheckATS}
          disabled={isAtsLoading}
          className="px-4 py-2 shadow-sm rounded-lg flex items-center gap-2 transition bg-white text-orange-600 border border-orange-600  hover:text-white hover:bg-orange-600 disabled:bg-orange-300 disabled:border-orange-300 disabled:text-white transition-all duration-200 cursor-pointer"
        >
          <Bot size={18} />
          {isAtsLoading ? "AI is Analyzing.." : "Check ATS Score & AI Feedback"}
        </button>
      </div>
    </div>
  );
};

export default ResumeHeader;
