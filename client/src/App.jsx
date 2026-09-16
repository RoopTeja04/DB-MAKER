import { useMemo, useState } from "react";

import SchemaEditor from "./components/editor/SchemaEditor";
import DiagramCanvas from "./components/diagram/DiagramCanvas";
import Toolbar from "./components/toolbar/Toolbar";

import defaultSchema from "./data/defaultSchema";

import { parseSchema } from "./parser/schemaParser";
import { schemaToGraph } from "./parser/schemaToGraph";

function App() {
  const [schema, setSchema] = useState(defaultSchema);

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

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0d12]">
      <Toolbar
        tableCount={graph.nodes.length}
        relationCount={graph.edges.length}
      />

      <div className="flex min-h-0 flex-1">
        {/* Editor */}
        <div className="w-[40%] min-w-[350px] border-r border-slate-800">
          <SchemaEditor
            value={schema}
            onChange={setSchema}
            onReset={handleReset}
          />
        </div>

        {/* Diagram */}
        <div className="min-w-0 flex-1">
          <DiagramCanvas graph={graph} />
        </div>
      </div>
    </div>
  );
}

export default App;
