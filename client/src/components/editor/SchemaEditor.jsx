function SchemaEditor({ value, onChange, onReset, onClose }) {
  return (
    <div className="flex h-full flex-col bg-[#111318]">
      <div className="flex h-12 items-center justify-between border-b border-slate-800 px-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Schema</h2>

          <p className="text-xs text-slate-500">DBML</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-slate-800"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close schema panel"
            title="Close schema panel"
            className="rounded-md border border-slate-700 px-2.5 py-1.5 text-sm leading-none text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            &times;
          </button>
        </div>
      </div>

      <div className="relative flex-1">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          className="h-full w-full resize-none bg-[#111318] p-5 font-mono text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-700"
          placeholder="Write your database schema..."
        />
      </div>

      <div className="border-t border-slate-800 px-4 py-2">
        <span className="text-xs text-slate-500">
          Supported: Table, columns, PK, Unique, Ref
        </span>
      </div>
    </div>
  );
}

export default SchemaEditor;
