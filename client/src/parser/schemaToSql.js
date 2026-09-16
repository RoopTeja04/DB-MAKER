export function schemaToSql(schemaData) {
  const { tables, references, enums } = schemaData;
  let sql = "";

  // 1. Generate Enums
  if (enums && enums.length > 0) {
    enums.forEach((enumDef) => {
      sql += `CREATE TYPE "${enumDef.name}" AS ENUM (\n`;
      const values = enumDef.values.map((v) => `  '${v}'`).join(",\n");
      sql += `${values}\n);\n\n`;
    });
  }

  // 2. Generate Tables
  tables.forEach((table) => {
    sql += `CREATE TABLE "${table.name}" (\n`;

    const columnDefs = table.columns.map((col) => {
      let def = `  "${col.name}" ${col.dataType}`;
      if (col.primaryKey) def += " PRIMARY KEY";
      if (col.unique && !col.primaryKey) def += " UNIQUE";
      if (col.default !== null && col.default !== undefined) {
        // Simple check if it's a string vs number
        const isNum = !isNaN(col.default) && !isNaN(parseFloat(col.default));
        def += ` DEFAULT ${isNum ? col.default : `'${col.default}'`}`;
      }
      return def;
    });

    sql += columnDefs.join(",\n");
    sql += `\n);\n\n`;

    // Generate Indexes if any
    if (table.indexes && table.indexes.length > 0) {
      table.indexes.forEach((idx, i) => {
        // Very basic index parsing (assuming format like "column_name [name: 'idx_name']")
        const parts = idx.match(
          /^([a-zA-Z_][a-zA-Z0-9_]*)(?:\s+\[name:\s*['"]([^'"]+)['"]\])?/,
        );
        if (parts) {
          const colName = parts[1];
          const idxName = parts[2] || `idx_${table.name}_${colName}`;
          sql += `CREATE INDEX "${idxName}" ON "${table.name}" ("${colName}");\n`;
        }
      });
      sql += "\n";
    }
  });

  // 3. Generate Foreign Keys
  if (references && references.length > 0) {
    references.forEach((ref) => {
      sql += `ALTER TABLE "${ref.sourceTable}" ADD FOREIGN KEY ("${ref.sourceColumn}") REFERENCES "${ref.targetTable}" ("${ref.targetColumn}");\n`;
    });
  }

  return sql;
}
