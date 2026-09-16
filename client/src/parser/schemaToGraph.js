export function schemaToGraph(schemaData) {
  const { tables, references } = schemaData;

  const nodes = tables.map((table, index) => {
    const columnCount = table.columns.length;

    return {
      id: table.name,
      type: "table",
      position: {
        x: (index % 3) * 400,
        y: Math.floor(index / 3) * Math.max(300, columnCount * 40),
      },
      data: {
        tableName: table.name,
        columns: table.columns,
      },
    };
  });

  const edges = references.map((reference) => {
    return {
      id: `${reference.sourceTable}-${reference.sourceColumn}-${reference.targetTable}-${reference.targetColumn}`,
      source: reference.sourceTable,
      target: reference.targetTable,
      sourceHandle: reference.sourceColumn,
      targetHandle: reference.targetColumn,

      type: "crowsfoot",

      animated: false,

      style: {
        strokeWidth: 2,
        stroke: "#64748b",
      },

      data: {
        sourceColumn: reference.sourceColumn,
        targetColumn: reference.targetColumn,
        relation: reference.relation,
      },
    };
  });

  return {
    nodes,
    edges,
  };
}
