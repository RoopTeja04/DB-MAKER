function SchemaEditor({ value, onChange, onReset }) {
  return (
    <div className="flex h-full flex-col bg-[#111318]">
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-slate-800 px-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Schema</h2>

          <p className="text-xs text-slate-500">DBML</p>
        </div>

        <button
          onClick={onReset}
          className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-slate-800"
        >
          Reset
        </button>
      </div>

      {/* Editor */}
      <div className="relative flex-1">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          className="h-full w-full resize-none bg-[#111318] p-5 font-mono text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-700"
          placeholder="Write your database schema..."
        />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-4 py-2">
        <span className="text-xs text-slate-500">
          Supported: Table, columns, PK, Unique, Ref
        </span>
      </div>
    </div>
  );
}

export default SchemaEditor;
