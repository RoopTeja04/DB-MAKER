function Toolbar({ tableCount, relationCount }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-[#111318] px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
          DBM
        </div>

        <div>
          <h1 className="text-sm font-semibold text-white">Data Base Maker</h1>

          <p className="text-xs text-slate-500">Schema visualizer</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs text-slate-500">
          Tables:
          <span className="ml-1 text-slate-300">{tableCount}</span>
        </div>

        <div className="text-xs text-slate-500">
          Relations:
          <span className="ml-1 text-slate-300">{relationCount}</span>
        </div>
      </div>
    </header>
  );
}

export default Toolbar;
