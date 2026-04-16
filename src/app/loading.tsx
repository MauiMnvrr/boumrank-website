export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-[var(--border-default)] border-t-[#1B6FC2] rounded-full animate-spin" />
        <span className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest">
          Chargement...
        </span>
      </div>
    </div>
  );
}
