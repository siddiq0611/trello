import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  subscribeToBoards,
  createBoard,
  deleteBoard,
} from "../firebase/boards";
import Navbar from "../components/ui/Navbar";
import Modal from "../components/ui/Modal";
import { SkeletonBoardCard } from "../components/ui/Skeleton";

const BOARD_COLORS = [
  "from-indigo-600 to-violet-700",
  "from-rose-600 to-pink-700",
  "from-emerald-600 to-teal-700",
  "from-amber-500 to-orange-600",
  "from-cyan-600 to-blue-700",
  "from-fuchsia-600 to-purple-700",
];

const BoardsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToBoards(user.uid, (data) => {
      setBoards(data);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    setCreating(true);
    setError(null);
    try {
      const id = await createBoard(user.uid, trimmed);
      setModalOpen(false);
      setNewTitle("");
      navigate(`/board/${id}`);
    } catch (err) {
      setError("Failed to create board.");
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (e, boardId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this board?")) return;
    try {
      await deleteBoard(boardId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="pt-20 px-4 md:px-8 pb-12 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
              Your Boards
            </h1>
            <p className="text-slate-500 font-body text-sm mt-1">
              {boards.length} board{boards.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-body font-medium text-sm px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-200"
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
            New Board
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBoardCard key={i} />
            ))}
          </div>
        ) : boards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400"
              >
                <rect x="3" y="3" width="7" height="18" rx="1" />
                <rect x="14" y="3" width="7" height="11" rx="1" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-slate-700 text-lg mb-2">
              No boards yet
            </h3>
            <p className="text-slate-500 font-body text-sm mb-6 max-w-xs">
              Create your first board to start organizing tasks visually.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-body text-sm px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-200"
            >
              Create your first board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {boards.map((board, i) => (
              <div
                key={board.id}
                onClick={() => navigate(`/board/${board.id}`)}
                className="group relative cursor-pointer rounded-xl overflow-hidden aspect-video flex flex-col justify-end p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${BOARD_COLORS[i % BOARD_COLORS.length]} opacity-90`}
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 flex items-end justify-between">
                  <h3 className="font-display font-bold text-white text-base tracking-tight leading-tight pr-2">
                    {board.title}
                  </h3>
                  <button
                    onClick={(e) => handleDelete(e, board.id)}
                    className="opacity-0 group-hover:opacity-100 bg-black/20 hover:bg-red-500/80 text-white p-1.5 rounded-lg transition-all"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setModalOpen(true)}
              className="aspect-video flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl text-slate-400 hover:text-indigo-500 font-body text-sm transition-all hover:bg-indigo-50 bg-white"
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
              New Board
            </button>
          </div>
        )}
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setNewTitle("");
          setError(null);
        }}
        title="Create new board"
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div>
            <label className="block text-slate-600 font-body text-sm mb-1.5">
              Board name
            </label>
            <input
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Product Roadmap"
              className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-400 rounded-xl px-4 py-3 text-slate-900 font-body text-sm outline-none placeholder-slate-400 transition-colors"
            />
          </div>
          {error && <p className="text-red-500 font-body text-sm">{error}</p>}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => {
                setModalOpen(false);
                setNewTitle("");
              }}
              className="text-slate-500 hover:text-slate-900 font-body text-sm px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || !newTitle.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-body font-medium text-sm px-5 py-2 rounded-xl transition-colors"
            >
              {creating ? "Creating..." : "Create board"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BoardsPage;
