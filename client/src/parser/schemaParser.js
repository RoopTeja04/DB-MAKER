function parseAttributes(attributeString = "") {
  const attributes = {
    primaryKey: false,
    unique: false,
    default: null,
  };

  const attributesList = attributeString
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  attributesList.forEach((attribute) => {
    if (attribute === "pk") {
      attributes.primaryKey = true;
    }

    if (attribute === "unique") {
      attributes.unique = true;
    }

    if (attribute.startsWith("default:")) {
      attributes.default = attribute
        .replace("default:", "")
        .trim()
        .replace(/^['"]|['"]$/g, "");
    }
  });

  return attributes;
}

function parseColumn(line) {
  const match = line.match(
    /^([a-zA-Z_][a-zA-Z0-9_]*)\s+([a-zA-Z0-9_()]+)(?:\s+(\[.*\]))?$/,
  );

  if (!match) {
    return null;
  }

  const [, name, dataType, attributeString] = match;

  const attributes = parseAttributes(attributeString);

  return {
    name,
    dataType,
    ...attributes,
  };
}

function parseTable(lines, startIndex) {
  const tableMatch = lines[startIndex].match(
    /^Table\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\{$/,
  );

  if (!tableMatch) {
    return null;
  }

  const tableName = tableMatch[1];
  const columns = [];
  const indexes = [];

  let index = startIndex + 1;
  let inIndexes = false;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (line === "}") {
      if (inIndexes) {
        inIndexes = false;
      } else {
        break;
      }
    } else if (line === "Indexes {") {
      inIndexes = true;
    } else if (line) {
      if (inIndexes) {
        indexes.push(line);
      } else {
        const column = parseColumn(line);
        if (column) {
          columns.push(column);
        }
      }
    }

    index++;
  }

  return {
    table: {
      name: tableName,
      columns,
      indexes,
    },
    nextIndex: index,
  };
}

function parseEnum(lines, startIndex) {
  const enumMatch = lines[startIndex].match(
    /^Enum\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\{$/,
  );

  if (!enumMatch) return null;

  const enumName = enumMatch[1];
  const values = [];

  let index = startIndex + 1;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (line === "}") {
      break;
    }

    if (line) {
      const valMatch = line.match(/^([a-zA-Z0-9_]+|'[^']+'|"[^"]+")/);
      if (valMatch) {
        values.push(valMatch[1].replace(/['"]/g, ""));
      }
    }

    index++;
  }

  return {
    enumDef: {
      name: enumName,
      values,
    },
    nextIndex: index,
  };
}

function parseReference(line) {
  const match = line.match(
    /^Ref:\s+([a-zA-Z_][a-zA-Z0-9_]*)\.([a-zA-Z_][a-zA-Z0-9_]*)\s*([<>-]+)\s*([a-zA-Z_][a-zA-Z0-9_]*)\.([a-zA-Z_][a-zA-Z0-9_]*)$/,
  );

  if (!match) {
    return null;
  }

  const [, sourceTable, sourceColumn, relation, targetTable, targetColumn] =
    match;

  return {
    sourceTable,
    sourceColumn,
    targetTable,
    targetColumn,
    relation,
  };
}

export function parseSchema(schema) {
  const lines = schema
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const tables = [];
  const references = [];
  const enums = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("Table ")) {
      const result = parseTable(lines, index);

      if (result) {
        tables.push(result.table);
        index = result.nextIndex + 1;
        continue;
      }
    }

    if (line.startsWith("Enum ")) {
      const result = parseEnum(lines, index);

      if (result) {
        enums.push(result.enumDef);
        index = result.nextIndex + 1;
        continue;
      }
    }

    if (line.startsWith("Ref:")) {
      const reference = parseReference(line);

      if (reference) {
        references.push(reference);
      }
    }

    index++;
  }

  return {
    tables,
    references,
    enums,
  };
}
