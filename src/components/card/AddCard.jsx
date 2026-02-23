// import { useState } from "react";
// import { createCard } from "../../firebase/cards";

// const AddCard = ({ listId, boardId, nextOrder }) => {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const trimmed = title.trim();
//     if (!trimmed) return;
//     setLoading(true);
//     try {
//       await createCard(boardId, listId, trimmed, nextOrder);
//       setTitle("");
//       setOpen(false);
//     } catch (err) {
//       console.error("Failed to create card:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKey = (e) => {
//     if (e.key === "Escape") {
//       setOpen(false);
//       setTitle("");
//     }
//   };

//   if (!open) {
//     return (
//       <button
//         onClick={() => setOpen(true)}
//         className="w-full text-left text-slate-500 hover:text-slate-300 font-body text-sm py-1.5 px-2 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center gap-2"
//       >
//         <svg
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2.5"
//         >
//           <line x1="12" y1="5" x2="12" y2="19" />
//           <line x1="5" y1="12" x2="19" y2="12" />
//         </svg>
//         Add card
//       </button>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//       <textarea
//         autoFocus
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         onKeyDown={handleKey}
//         placeholder="Card title..."
//         rows={2}
//         className="w-full bg-slate-900 border border-slate-600 focus:border-indigo-500 rounded-lg p-2 text-slate-200 font-body text-sm outline-none resize-none placeholder-slate-500 transition-colors"
//       />
//       <div className="flex items-center gap-2">
//         <button
//           type="submit"
//           disabled={loading || !title.trim()}
//           className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-body text-sm px-3 py-1.5 rounded-lg transition-colors"
//         >
//           {loading ? "Adding..." : "Add card"}
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setOpen(false);
//             setTitle("");
//           }}
//           className="text-slate-400 hover:text-white font-body text-sm px-2 py-1.5 transition-colors"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddCard;

import { useState } from "react";
import { createCard } from "../../firebase/cards";

const AddCard = ({ listId, boardId, nextOrder }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      await createCard(boardId, listId, trimmed, nextOrder);
      setTitle("");
      setOpen(false);
    } catch (err) {
      console.error("Failed to create card:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      setTitle("");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left text-slate-400 hover:text-slate-700 font-body text-sm py-1.5 px-2 rounded-lg hover:bg-slate-200/60 transition-colors flex items-center gap-2"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add card
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Card title..."
        rows={2}
        className="w-full bg-white border border-slate-300 focus:border-indigo-400 rounded-lg p-2 text-slate-800 font-body text-sm outline-none resize-none placeholder-slate-400 transition-colors shadow-sm"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-body text-sm px-3 py-1.5 rounded-lg transition-colors"
        >
          {loading ? "Adding..." : "Add card"}
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
  );
};

export default AddCard;
