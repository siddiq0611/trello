import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { BoardProvider, useBoardContext } from "../contexts/BoardContext";
import List from "../components/list/List";
import AddList from "../components/list/AddList";
import { CardOverlay } from "../components/card/Card";
import Navbar from "../components/ui/Navbar";
import { SkeletonList } from "../components/ui/Skeleton";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

const BoardContent = ({ boardTitle, boardId }) => {
  const { lists, cards, listsLoading, cardsLoading, setLists, setCards } =
    useBoardContext();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const { activeItem, handleDragStart, handleDragOver, handleDragEnd } =
    useDragAndDrop({ lists, cards, setLists, setCards });

  const listIds = lists.map((l) => l.id);
  const nextListOrder =
    lists.length > 0 ? Math.max(...lists.map((l) => l.order)) + 1 : 0;

  if (listsLoading || cardsLoading) {
    return (
      <div className="flex gap-4 p-4 overflow-x-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonList key={i} />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-56px)] items-start bg-slate-100">
        <SortableContext
          items={listIds}
          strategy={horizontalListSortingStrategy}
        >
          {lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
        </SortableContext>
        <AddList boardId={boardId} nextOrder={nextListOrder} />
      </div>

      <DragOverlay>
        {activeItem?.type === "card" && <CardOverlay card={activeItem.data} />}
      </DragOverlay>
    </DndContext>
  );
};

const BoardDetailsPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [boardLoading, setBoardLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!boardId) return;
    const fetchBoard = async () => {
      try {
        const snap = await getDoc(doc(db, "boards", boardId));
        if (!snap.exists()) {
          setNotFound(true);
        } else {
          setBoard({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setBoardLoading(false);
      }
    };
    fetchBoard();
  }, [boardId]);

  if (boardLoading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />
        <div className="pt-14">
          <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-2 animate-pulse shadow-sm">
            <div className="h-4 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-4 bg-slate-200 rounded" />
            <div className="h-4 w-32 bg-slate-200 rounded" />
          </div>
          <div className="flex gap-4 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonList key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">
            Board not found
          </h2>
          <p className="text-slate-500 font-body text-sm mb-6">
            This board doesn't exist or you don't have access.
          </p>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-body text-sm px-4 py-2 rounded-xl transition-colors"
          >
            Back to boards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="pt-14">
        <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-2 shadow-sm">
          <Link
            to="/"
            className="text-slate-500 hover:text-slate-900 font-body text-sm transition-colors"
          >
            Boards
          </Link>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-400"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="font-display font-semibold text-slate-900 text-sm">
            {board?.title}
          </span>
        </div>

        <BoardProvider boardId={boardId}>
          <BoardContent boardTitle={board?.title} boardId={boardId} />
        </BoardProvider>
      </div>
    </div>
  );
};

export default BoardDetailsPage;
