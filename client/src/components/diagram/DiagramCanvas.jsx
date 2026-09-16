import { useEffect, useRef } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import TableNode from "./TableNode";
import CrowsFootEdge from "./CrowsFootEdge";
import { getLayoutedElements } from "../../parser/layoutElements";
import { useTheme } from "../../contexts/ThemeContext";

const nodeTypes = {
  table: TableNode,
};

const edgeTypes = {
  crowsfoot: CrowsFootEdge,
};

function DiagramCanvas({ graph }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      graph.nodes,
      graph.edges,
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [graph, setNodes, setEdges]);

  return (
    <div
      className={`h-full w-full ${theme === "dark" ? "bg-[#0b0d12]" : "bg-slate-50"}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="top-right"
        colorMode={theme}
      >
        <Background
          gap={20}
          size={1}
          color={theme === "dark" ? "#334155" : "#cbd5e1"}
        />
        <Controls />
        <MiniMap
          nodeColor={theme === "dark" ? "#475569" : "#94a3b8"}
          maskColor={
            theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)"
          }
        />
      </ReactFlow>
    </div>
  );
}

export default DiagramCanvas;
