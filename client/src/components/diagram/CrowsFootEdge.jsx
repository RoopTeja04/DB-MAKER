import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

export default function CrowsFootEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} id={id} />
      {/* Crows foot SVG directly at the target end */}
      <g
        transform={`translate(${targetX}, ${targetY})`}
        fill="none"
        stroke={style.stroke || "#94a3b8"}
        strokeWidth={2}
      >
        <path d="M 0,0 L -10,-10 M 0,0 L -10,10 M -10,-10 L -10,10" />
      </g>
    </>
  );
}
