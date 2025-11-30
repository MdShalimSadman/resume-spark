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
    <div className={viewMode === "preview" ? "lg:col-span-2" : ""}>
      <div className="space-y-4 shadow-lg overflow-auto">
        {pageContents.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className="bg-white rounded-xl shadow-xl p-8"
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
