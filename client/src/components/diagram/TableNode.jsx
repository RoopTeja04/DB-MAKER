import { Handle, Position } from "@xyflow/react";

function TableNode({ data }) {
  return (
    <div className="min-w-[280px] overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-0 !bg-blue-500"
      />

      {/* Table Header */}
      <div className="border-b border-slate-700 bg-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/20 text-blue-400">
            ▦
          </div>

          <span className="font-semibold text-white">{data.tableName}</span>
        </div>
      </div>

      {/* Columns */}
      <div>
        {data.columns.map((column) => (
          <div
            key={column.name}
            className="relative flex items-center justify-between border-b border-slate-800 px-4 py-2.5 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              {column.primaryKey && (
                <span className="text-xs font-bold text-yellow-400">PK</span>
              )}

              {column.unique && !column.primaryKey && (
                <span className="text-xs font-bold text-purple-400">UQ</span>
              )}

              <span className="text-sm text-slate-200">{column.name}</span>
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

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-0 !bg-blue-500"
      />
    </div>
  );
}

export default TableNode;
