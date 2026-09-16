import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../contexts/ThemeContext";

const dbmlLanguageDef = {
  keywords: ["Table", "Ref", "Enum", "Indexes"],
  operators: [">", "<", "-", "."],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  tokenizer: {
    root: [
      [
        /[a-zA-Z_]\w*/,
        { cases: { "@keywords": "keyword", "@default": "identifier" } },
      ],
      [/[\[\]{}]/, "delimiter.bracket"],
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/'/, { token: "string.quote", bracket: "@open", next: "@string2" }],
      [/\/\/.*$/, "comment"],
    ],
    string: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],
    string2: [
      [/[^\\']+/, "string"],
      [/\\./, "string.escape.invalid"],
      [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],
  },
};

function SchemaEditor({ value, onChange, onReset, onClose }) {
  const { theme } = useTheme();

  const handleEditorWillMount = (monaco) => {
    if (!monaco.languages.getLanguages().some((l) => l.id === "dbml")) {
      monaco.languages.register({ id: "dbml" });
      monaco.languages.setMonarchTokensProvider("dbml", dbmlLanguageDef);
    }
  };

  return (
    <div
      className={`flex h-full flex-col ${theme === "dark" ? "bg-[#111318]" : "bg-slate-50"}`}
    >
      <div
        className={`flex h-12 items-center justify-between border-b px-4 ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h2
            className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            Schema
          </h2>
          <p className="text-xs text-slate-500">DBML</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className={`rounded-md border px-3 py-1.5 text-xs transition ${theme === "dark" ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-300 text-slate-600 hover:bg-slate-200"}`}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close schema panel"
            title="Close schema panel"
            className={`rounded-md border px-2.5 py-1.5 text-sm leading-none transition ${theme === "dark" ? "border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white" : "border-slate-300 text-slate-500 hover:bg-slate-200 hover:text-slate-800"}`}
          >
            &times;
          </button>
        </div>
      </div>

      <div className="relative flex-1 py-4">
        <Editor
          height="100%"
          language="dbml"
          theme={theme === "dark" ? "vs-dark" : "light"}
          value={value}
          onChange={(val) => onChange(val || "")}
          beforeMount={handleEditorWillMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div
        className={`border-t px-4 py-2 ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}
      >
        <span className="text-xs text-slate-500">
          Supported: Table, columns, PK, Unique, Ref, Enum, Indexes, default
        </span>
      </div>
    </div>
  );
}

export default SchemaEditor;
