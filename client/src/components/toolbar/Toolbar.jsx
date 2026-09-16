import { useState } from "react";
import { Download, Database, Moon, Sun } from "lucide-react";
import { toPng } from "html-to-image";
import { schemaToSql } from "../../parser/schemaToSql";
import { useTheme } from "../../contexts/ThemeContext";

function Toolbar({ tableCount, relationCount, parsedSchema }) {
  const { theme, toggleTheme } = useTheme();
  const [showSql, setShowSql] = useState(false);
  const [sqlContent, setSqlContent] = useState("");

  const handleExportImage = () => {
    const el = document.querySelector(".react-flow__viewport");
    if (!el) return;

    toPng(el, { backgroundColor: theme === "dark" ? "#0b0d12" : "#f8fafc" })
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "db-diagram.png";
        a.click();
      })
      .catch((err) => console.error("Failed to export image", err));
  };

  const handleExportSql = () => {
    if (parsedSchema) {
      setSqlContent(schemaToSql(parsedSchema));
      setShowSql(true);
    }
  };

  return (
    <>
      <header
        className={`flex h-14 items-center justify-between border-b px-5 ${theme === "dark" ? "border-slate-800 bg-[#111318]" : "border-slate-200 bg-white"}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            DBM
          </div>

          <div>
            <h1
              className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Data Base Maker
            </h1>
            <p className="text-xs text-slate-500">Schema visualizer</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-slate-700 pr-6">
            <div className="text-xs text-slate-500">
              Tables:
              <span
                className={`ml-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                {tableCount}
              </span>
            </div>

            <div className="text-xs text-slate-500">
              Relations:
              <span
                className={`ml-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
              >
                {relationCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSql}
              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition ${theme === "dark" ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-300 text-slate-700 hover:bg-slate-100"}`}
              title="Export SQL"
            >
              <Database size={14} />
              Export SQL
            </button>
            <button
              onClick={handleExportImage}
              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition ${theme === "dark" ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-300 text-slate-700 hover:bg-slate-100"}`}
              title="Export PNG"
            >
              <Download size={14} />
              Export PNG
            </button>
            <button
              onClick={toggleTheme}
              className={`flex h-8 w-8 items-center justify-center rounded-md border transition ${theme === "dark" ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-300 text-slate-700 hover:bg-slate-100"}`}
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* SQL Export Modal */}
      {showSql && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`flex max-h-[80vh] w-[600px] flex-col overflow-hidden rounded-xl border shadow-2xl ${theme === "dark" ? "border-slate-800 bg-[#111318]" : "border-slate-200 bg-white"}`}
          >
            <div
              className={`flex items-center justify-between border-b px-5 py-4 ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}
            >
              <h3
                className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Generated SQL
              </h3>
              <button
                onClick={() => setShowSql(false)}
                className={`text-2xl leading-none transition ${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                &times;
              </button>
            </div>
            <div
              className={`flex-1 overflow-auto p-5 font-mono text-sm ${theme === "dark" ? "bg-[#0b0d12] text-green-400" : "bg-slate-50 text-blue-800"}`}
            >
              <pre>{sqlContent}</pre>
            </div>
            <div
              className={`border-t px-5 py-3 text-right ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}
            >
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlContent);
                  setShowSql(false);
                }}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Toolbar;
