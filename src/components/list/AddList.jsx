import { useState } from "react";
import { createList } from "../../firebase/lists";

const AddList = ({ boardId, nextOrder }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      await createList(boardId, trimmed, nextOrder);
      setTitle("");
      setOpen(false);
    } catch (err) {
      console.error("Failed to create list:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex-shrink-0 w-72 h-12 flex items-center gap-2 bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20 text-slate-500 hover:text-slate-800 rounded-xl px-4 font-body text-sm transition-all"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add another list
      </button>
    );
  }

  return (
    <div className="flex-shrink-0 w-72 bg-slate-200 border border-slate-300 rounded-xl p-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Escape" && (setOpen(false), setTitle(""))
          }
          placeholder="List name..."
          className="w-full bg-white border border-slate-300 focus:border-indigo-400 rounded-lg px-3 py-2 text-slate-800 font-body text-sm outline-none placeholder-slate-400 transition-colors shadow-sm"
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-body text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            {loading ? "Creating..." : "Add list"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setTitle("");
            }}
            className="text-slate-500 hover:text-slate-800 font-body text-sm px-2 py-1.5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddList;
