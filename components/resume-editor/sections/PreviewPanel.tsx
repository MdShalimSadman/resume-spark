"use client";

import React from "react";
import { PageRow } from "../../../types/resumeTypes";

interface PreviewPanelProps {
  pageContents: PageRow[][];
  viewMode: "edit" | "preview";
  pageHeight: number;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  pageContents,
  viewMode,
  pageHeight,
}) => {
  return (
    <div className={viewMode === "preview" ? "lg:col-span-2 mx-auto" : "max-h-[80vh] overflow-auto"}>
      <div className="space-y-4 pr-1 overflow-auto">
        {pageContents.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className="bg-white border border-gray-200  rounded-xl  p-8 max-w-2xl "
            style={{ height: pageHeight, overflow: "hidden" }}
          >
            {page.map((content: PageRow, idx: number) => (
              <div key={idx}>{content}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPanel;
