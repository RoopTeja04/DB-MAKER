import { Handle, Position } from "@xyflow/react";
import { useTheme } from "../../contexts/ThemeContext";

function TableNode({ data }) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-w-[280px] overflow-hidden rounded-xl border shadow-2xl ${theme === "dark" ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-0 !bg-blue-500"
      />

      <div
        className={`border-b px-4 py-3 ${theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/20 text-blue-500">
            ▦
          </div>
          <span
            className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            {data.tableName}
          </span>
        </div>
      </div>

      <div>
        {data.columns.map((column) => (
          <div
            key={column.name}
            className={`relative flex items-center justify-between border-b px-4 py-2.5 last:border-b-0 ${theme === "dark" ? "border-slate-800" : "border-slate-100"}`}
          >
            <div className="flex items-center gap-2">
              <Handle
                type="target"
                position={Position.Left}
                id={column.name}
                className="!h-2 !w-2 !border-0 !bg-blue-500"
              />
              {column.primaryKey && (
                <span className="text-xs font-bold text-yellow-500">PK</span>
              )}

              {column.unique && !column.primaryKey && (
                <span className="text-xs font-bold text-purple-500">UQ</span>
              )}

              <span
                className={`text-sm ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}
              >
                {column.name}
              </span>

              {column.default && (
                <span className="ml-1 text-[10px] text-slate-500 italic">
                  d: {column.default}
                </span>
              )}
            </div>

            <span className="text-xs text-slate-500">{column.dataType}</span>

            <Handle
              type="source"
              position={Position.Right}
              id={column.name}
              className="!h-2 !w-2 !border-0 !bg-blue-500"
            />
          </div>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-0 !bg-blue-500"
      />
    </div>
  );
}

export default TableNode;
