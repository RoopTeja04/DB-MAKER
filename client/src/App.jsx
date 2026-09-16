import { useEffect, useMemo, useRef, useState } from "react";

import SchemaEditor from "./components/editor/SchemaEditor";
import DiagramCanvas from "./components/diagram/DiagramCanvas";
import Toolbar from "./components/toolbar/Toolbar";

import defaultSchema from "./data/defaultSchema";

import { parseSchema } from "./parser/schemaParser";
import { schemaToGraph } from "./parser/schemaToGraph";

function App() {
  const [schema, setSchema] = useState(defaultSchema);
  const [isSchemaOpen, setIsSchemaOpen] = useState(true);
  const [schemaWidth, setSchemaWidth] = useState(25);
  const [isResizing, setIsResizing] = useState(false);
  const workspaceRef = useRef(null);

  const graph = useMemo(() => {
    try {
      const parsedSchema = parseSchema(schema);

      return schemaToGraph(parsedSchema);
    } catch (error) {
      console.error("Parser error:", error);

      return {
        nodes: [],
        edges: [],
      };
    }
  }, [schema]);

  const handleReset = () => {
    setSchema(defaultSchema);
  };

  useEffect(() => {
    if (!isResizing) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const workspace = workspaceRef.current;

      if (!workspace) {
        return;
      }

      const { left, width } = workspace.getBoundingClientRect();
      const nextWidth = ((event.clientX - left) / width) * 100;

      setSchemaWidth(Math.min(65, Math.max(20, nextWidth)));
    };

    const stopResizing = () => setIsResizing(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResizing);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResizing);
    };
  }, [isResizing]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0d12]">
      <Toolbar
        tableCount={graph.nodes.length}
        relationCount={graph.edges.length}
      />

      <div ref={workspaceRef} className="relative flex min-h-0 flex-1">
        {isSchemaOpen ? (
          <>
            <div
              className="min-w-0 shrink-0 border-r border-slate-800"
              style={{ width: `${schemaWidth}%` }}
            >
              <SchemaEditor
                value={schema}
                onChange={setSchema}
                onReset={handleReset}
                onClose={() => setIsSchemaOpen(false)}
              />
            </div>

            <div
              role="separator"
              aria-label="Resize schema panel"
              aria-orientation="vertical"
              onPointerDown={() => setIsResizing(true)}
              className={`group relative z-10 -ml-px w-2 shrink-0 cursor-col-resize border-r border-slate-800 bg-[#0b0d12] transition-colors hover:bg-blue-500/30 ${
                isResizing ? "bg-blue-500/40" : ""
              }`}
            >
              <span className="absolute left-1/2 top-1/2 h-10 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400" />
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsSchemaOpen(true)}
            className="absolute left-3 top-3 z-10 rounded-md border border-slate-700 bg-[#111318] px-3 py-2 text-xs font-medium text-slate-300 shadow-lg transition hover:border-blue-500 hover:text-white"
          >
            Show schema
          </button>
        )}

        <div className="min-w-0 flex-1">
          <DiagramCanvas graph={graph} />
        </div>
      </div>
    </div>
  );
}

export default App;
