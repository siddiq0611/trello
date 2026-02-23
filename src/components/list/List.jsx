import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateList, deleteList } from "../../firebase/lists";
import { useBoardContext } from "../../contexts/BoardContext";
import Card from "../card/Card";
import AddCard from "../card/AddCard";
import InlineEdit from "../ui/InlineEdit";

const List = ({ list }) => {
  const { getCardsForList } = useBoardContext();
  const cards = getCardsForList(list.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id, data: { type: "list", list } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTitleSave = async (newTitle) => {
    try {
      await updateList(list.id, { title: newTitle });
    } catch (err) {
      console.error("Failed to update list:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete list "${list.title}" and all its cards?`))
      return;
    try {
      await deleteList(list.id);
    } catch (err) {
      console.error("Failed to delete list:", err);
    }
  };

  const cardIds = cards.map((c) => c.id);
  const nextOrder =
    cards.length > 0 ? Math.max(...cards.map((c) => c.order)) + 1 : 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-200/80 border border-slate-300/60 rounded-xl w-72 flex-shrink-0 flex flex-col max-h-[calc(100vh-120px)]"
    >
      <div
        className="flex items-center justify-between px-3 py-2.5 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <InlineEdit
          value={list.title}
          onSave={handleTitleSave}
          className="font-display font-semibold text-slate-800 text-sm tracking-wide"
          inputClassName="text-sm font-semibold"
        />
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500 font-body bg-white/70 px-1.5 py-0.5 rounded border border-slate-200">
            {cards.length}
          </span>
          <button
            onClick={handleDelete}
            className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-2 min-h-[2px]">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </SortableContext>
      </div>

      <div className="px-2 pb-2 pt-1">
        <AddCard
          listId={list.id}
          boardId={list.boardId}
          nextOrder={nextOrder}
        />
      </div>
    </div>
  );
};

export default List;
