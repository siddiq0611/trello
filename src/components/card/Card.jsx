// import { useState } from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { updateCard, deleteCard } from "../../firebase/cards";
// import InlineEdit from "../ui/InlineEdit";

// const Card = ({ card }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: card.id, data: { type: "card", card } });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.4 : 1,
//   };

//   const handleTitleSave = async (newTitle) => {
//     try {
//       await updateCard(card.id, { title: newTitle });
//     } catch (err) {
//       console.error("Failed to update card:", err);
//     }
//   };

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await deleteCard(card.id);
//     } catch (err) {
//       console.error("Failed to delete card:", err);
//       setDeleting(false);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className={`group relative bg-slate-700 hover:bg-slate-650 border border-slate-600 hover:border-indigo-500/40 rounded-lg p-3 shadow-card hover:shadow-card-hover transition-all duration-150 ${
//         isDragging ? "cursor-grabbing" : "cursor-grab"
//       } ${deleting ? "opacity-50 pointer-events-none" : ""}`}
//       {...attributes}
//       {...listeners}
//     >
//       <div className="flex items-start justify-between gap-2">
//         <InlineEdit
//           value={card.title}
//           onSave={handleTitleSave}
//           className="font-body text-sm text-slate-200 leading-snug flex-1"
//           inputClassName="text-sm"
//         />
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setMenuOpen((o) => !o);
//           }}
//           className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all flex-shrink-0 p-0.5 rounded"
//         >
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <polyline points="3 6 5 6 21 6" />
//             <path d="M19 6l-1 14H6L5 6" />
//             <path d="M10 11v6M14 11v6" />
//             <path d="M9 6V4h6v2" />
//           </svg>
//         </button>
//       </div>

//       {menuOpen && (
//         <div className="absolute right-0 top-8 z-20 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-1 min-w-[120px]">
//           <button
//             onClick={handleDelete}
//             className="w-full text-left text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded text-sm font-body"
//           >
//             Delete card
//           </button>
//           <button
//             onClick={() => setMenuOpen(false)}
//             className="w-full text-left text-slate-400 hover:bg-slate-700 px-3 py-1.5 rounded text-sm font-body"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export const CardOverlay = ({ card }) => (
//   <div className="bg-slate-700 border border-indigo-500 rounded-lg p-3 shadow-2xl cursor-grabbing rotate-2 scale-105">
//     <p className="font-body text-sm text-slate-200">{card.title}</p>
//   </div>
// );

// export default Card;

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateCard, deleteCard } from "../../firebase/cards";
import InlineEdit from "../ui/InlineEdit";

const Card = ({ card }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", card } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleTitleSave = async (newTitle) => {
    try {
      await updateCard(card.id, { title: newTitle });
    } catch (err) {
      console.error("Failed to update card:", err);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCard(card.id);
    } catch (err) {
      console.error("Failed to delete card:", err);
      setDeleting(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-150 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${deleting ? "opacity-50 pointer-events-none" : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <InlineEdit
          value={card.title}
          onSave={handleTitleSave}
          className="font-body text-sm text-slate-700 leading-snug flex-1"
          inputClassName="text-sm"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((o) => !o);
          }}
          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all flex-shrink-0 p-0.5 rounded"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-0 top-8 z-20 bg-white border border-slate-200 rounded-lg shadow-lg p-1 min-w-[120px]">
          <button
            onClick={handleDelete}
            className="w-full text-left text-red-500 hover:bg-red-50 px-3 py-1.5 rounded text-sm font-body"
          >
            Delete card
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-full text-left text-slate-500 hover:bg-slate-50 px-3 py-1.5 rounded text-sm font-body"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export const CardOverlay = ({ card }) => (
  <div className="bg-white border border-indigo-400 rounded-lg p-3 shadow-xl cursor-grabbing rotate-2 scale-105">
    <p className="font-body text-sm text-slate-700">{card.title}</p>
  </div>
);

export default Card;
