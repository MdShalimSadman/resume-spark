import { FC } from "react";

const ReportSection: FC<{
  title: string;
  items: string[];
  icon: string;
  color: string;
}> = ({ title, items, icon, color }) => (
  <div className={`p-5 rounded-xl shadow-lg border-t-4 ${color}`}>
    <h3 className="text-2xl font-semibold mb-3 flex items-center">
      <span className="mr-2 text-3xl">{icon}</span> {title}
    </h3>
    <ul className="space-y-2 list-none p-0">
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, index) => (
          <li key={index} className="flex items-start text-gray-700">
            <span
              className="text-xl mr-2 flex-shrink-0"
              style={{
                color: color.includes("green")
                  ? "#10b981"
                  : color.includes("red")
                  ? "#ef4444"
                  : color.includes("blue")
                  ? "#3b82f6"
                  : "#f97316",
              }}
            >
              •
            </span>
            {item}
          </li>
        ))
      ) : (
        <li className="text-gray-500 italic">
          No items found in this section.
        </li>
      )}
    </ul>
  </div>
);

export default ReportSection;