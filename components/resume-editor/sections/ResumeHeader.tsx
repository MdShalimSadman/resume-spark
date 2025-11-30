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
    <div className="md:mb-6 mb-3 flex justify-between items-center p-3 md:p-0">
      <Link href={"/"}>
        <Image
          src="/images/logo-black.png"
          width={150}
          height={150}
          priority
          alt="logo"
          className="hidden md:block"
        />
        <Image
          src="/images/mobile-logo.png"
          width={40}
          height={40}
          priority
          alt="logo"
          className="md:hidden"
        />
      </Link>
      <div className="flex gap-2">
        <div className="hidden bg-white shadow-sm rounded-full p-1 lg:flex">
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
          className="px-4 shadow-sm py-2 rounded-lg flex items-center gap-2 transition bg-white text-orange-600 border border-orange-600  hover:text-white hover:bg-orange-600 disabled:bg-orange-300 disabled:border-orange-300 disabled:text-white duration-200 cursor-pointer"
          disabled={isDownloading}
        >
          <Download size={18} />
          <p className="hidden lg:block">
            {isDownloading ? "Generating..." : "Download "}
          </p>
        </button>
        <button
          onClick={handleCheckATS}
          disabled={isAtsLoading}
          className="px-4 py-2 shadow-sm rounded-lg flex items-center gap-2 transition bg-white text-orange-600 border border-orange-600  hover:text-white hover:bg-orange-600 disabled:bg-orange-300 disabled:border-orange-300 disabled:text-white duration-200 cursor-pointer"
        >
          <Bot size={18} className="hidden lg:block" />
          <p className="hidden lg:block">
            {isAtsLoading
              ? "AI is Analyzing.."
              : "Check ATS Score & AI Feedback"}
          </p>
          <p className="text-xs lg:hidden"> {isAtsLoading
              ? "Analyzing.."
              : "ATS Score"}</p>
        </button>
      </div>
    </div>
  );
};

export default ResumeHeader;
