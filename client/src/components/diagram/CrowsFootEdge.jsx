import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from "@xyflow/react";

/**
 * DBML relation syntax:
 *   >   many-to-one   (source has many, target has one)
 *   <   one-to-many   (source has one, target has many)
 *   -   one-to-one
 *   <>  many-to-many
 */

const STROKE = "#64748b";
const STROKE_WIDTH = 1.8;

// Draw a single "one" bar marker (perpendicular line)
function OneMarker({ x, y, angle }) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad) * 12;
  const dy = Math.sin(rad) * 12;
  const px = -Math.sin(rad) * 8;
  const py = Math.cos(rad) * 8;
  return (
    <g>
      <line
        x1={x + dx - px}
        y1={y + dy - py}
        x2={x + dx + px}
        y2={y + dy + py}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      <line
        x1={x + dx * 1.8 - px}
        y1={y + dy * 1.8 - py}
        x2={x + dx * 1.8 + px}
        y2={y + dy * 1.8 + py}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
    </g>
  );
}

// Draw a crow's foot "many" marker (three prongs)
function ManyMarker({ x, y, angle }) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad) * 12;
  const dy = Math.sin(rad) * 12;
  const px = -Math.sin(rad) * 8;
  const py = Math.cos(rad) * 8;
  return (
    <g>
      {/* base bar */}
      <line
        x1={x + dx - px}
        y1={y + dy - py}
        x2={x + dx + px}
        y2={y + dy + py}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      {/* left prong */}
      <line
        x1={x}
        y1={y}
        x2={x + dx + px}
        y2={y + dy + py}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      {/* right prong */}
      <line
        x1={x}
        y1={y}
        x2={x + dx - px}
        y2={y + dy - py}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
      {/* center prong */}
      <line
        x1={x}
        y1={y}
        x2={x + dx}
        y2={y + dy}
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
      />
    </g>
  );
}

function getAngle(sourceX, sourceY, targetX, targetY) {
  return (Math.atan2(targetY - sourceY, targetX - sourceX) * 180) / Math.PI;
}

export default function CrowsFootEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data = {},
  label,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const relation = data.relation || ">";
  // Angle pointing FROM source TO target (for target marker)
  const angleToTarget = getAngle(sourceX, sourceY, targetX, targetY);
  // Angle pointing FROM target TO source (for source marker)
  const angleToSource = getAngle(targetX, targetY, sourceX, sourceY);

  // Parse relation into source-side and target-side cardinality
  // DBML: "source.col > target.col" means source is MANY, target is ONE
  let sourceIsMany = false;
  let targetIsMany = false;

  if (relation === ">") {
    // source many → target one
    sourceIsMany = true;
    targetIsMany = false;
  } else if (relation === "<") {
    // source one → target many
    sourceIsMany = false;
    targetIsMany = true;
  } else if (relation === "-") {
    // one-to-one
    sourceIsMany = false;
    targetIsMany = false;
  } else if (relation === "<>") {
    // many-to-many
    sourceIsMany = true;
    targetIsMany = true;
  }

  const edgeStyle = { strokeWidth: STROKE_WIDTH, stroke: STROKE, ...style };

  return (
    <>
      <BaseEdge path={edgePath} style={edgeStyle} id={id} />

      {/* Source-side marker */}
      {sourceIsMany ? (
        <ManyMarker x={sourceX} y={sourceY} angle={angleToSource} />
      ) : (
        <OneMarker x={sourceX} y={sourceY} angle={angleToSource} />
      )}

      {/* Target-side marker */}
      {targetIsMany ? (
        <ManyMarker x={targetX} y={targetY} angle={angleToTarget} />
      ) : (
        <OneMarker x={targetX} y={targetY} angle={angleToTarget} />
      )}

      {/* Cardinality label in the center */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "none",
          }}
          className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-mono text-slate-300 backdrop-blur-sm"
        >
          {relation === ">" && "N:1"}
          {relation === "<" && "1:N"}
          {relation === "-" && "1:1"}
          {relation === "<>" && "N:N"}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
