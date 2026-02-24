import { useState, useCallback, useRef } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { batchUpdateCards } from "../firebase/cards";
import { batchUpdateLists } from "../firebase/lists";

export const useDragAndDrop = ({ lists, cards, setLists, setCards }) => {
  const [activeItem, setActiveItem] = useState(null);

  const listsRef = useRef(lists);
  const cardsRef = useRef(cards);
  listsRef.current = lists;
  cardsRef.current = cards;

  const dragOriginListId = useRef(null);

  const handleDragStart = useCallback(({ active }) => {
    const type = active.data.current?.type;
    if (type === "card") {
      const card = active.data.current.card;
      dragOriginListId.current = card.listId;
      setActiveItem({ type: "card", data: card });
    } else if (type === "list") {
      dragOriginListId.current = null;
      setActiveItem({ type: "list", data: active.data.current.list });
    }
  }, []);

  const handleDragOver = useCallback(({ active, over }) => {
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const activeType = active.data.current?.type;
    if (activeType !== "card") return;

    const currentCards = cardsRef.current;
    const currentLists = listsRef.current;

    const activeCard = currentCards.find((c) => c.id === activeId);
    if (!activeCard) return;

    const overCard = currentCards.find((c) => c.id === overId);
    const overList = currentLists.find((l) => l.id === overId);

    const targetListId = overCard ? overCard.listId : overList ? overId : null;
    if (!targetListId) return;

    if (activeCard.listId !== targetListId) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, listId: targetListId } : c,
        ),
      );
    }
  }, []);

  const handleDragEnd = useCallback(async ({ active, over }) => {
    setActiveItem(null);

    const activeType = active.data.current?.type;

    if (activeType === "list") {
      if (!over || active.id === over.id) return;

      const currentLists = listsRef.current;
      const oldIndex = currentLists.findIndex((l) => l.id === active.id);
      const newIndex = currentLists.findIndex((l) => l.id === over.id);
      if (oldIndex === newIndex) return;

      const reordered = arrayMove(currentLists, oldIndex, newIndex);
      setLists(reordered);

      const updates = reordered.map((list, idx) => ({
        id: list.id,
        data: { order: idx },
      }));
      await batchUpdateLists(updates).catch(console.error);
      return;
    }

    if (activeType === "card") {
      const currentCards = cardsRef.current;
      const currentLists = listsRef.current;

      const activeCard = currentCards.find((c) => c.id === active.id);
      if (!activeCard) return;

      const finalListId = activeCard.listId;

      const originListId = dragOriginListId.current;

      const overCard = over ? currentCards.find((c) => c.id === over.id) : null;
      const overList = over ? currentLists.find((l) => l.id === over.id) : null;
      const targetListId = overCard
        ? overCard.listId
        : overList
          ? over.id
          : finalListId;

      const targetCards = currentCards
        .filter((c) => c.listId === targetListId)
        .sort((a, b) => a.order - b.order);

      let reordered;

      if (originListId === targetListId) {
        if (!over || active.id === over.id) return;
        const oldIdx = targetCards.findIndex((c) => c.id === active.id);
        const newIdx = overCard
          ? targetCards.findIndex((c) => c.id === over.id)
          : targetCards.length - 1;
        if (oldIdx === newIdx) return;
        reordered = arrayMove(targetCards, oldIdx, newIdx);
      } else {
        const withoutActive = targetCards.filter((c) => c.id !== active.id);
        const insertIdx = overCard
          ? withoutActive.findIndex((c) => c.id === over.id)
          : withoutActive.length;
        const safeInsert = insertIdx === -1 ? withoutActive.length : insertIdx;
        withoutActive.splice(safeInsert, 0, {
          ...activeCard,
          listId: targetListId,
        });
        reordered = withoutActive;
      }

      setCards((prev) => {
        const unchanged = prev.filter(
          (c) => c.listId !== targetListId && c.id !== active.id,
        );
        const updated = reordered.map((c, idx) => ({
          ...c,
          listId: targetListId,
          order: idx,
        }));
        return [...unchanged, ...updated];
      });

      const updates = reordered.map((c, idx) => ({
        id: c.id,
        data: { listId: targetListId, order: idx },
      }));
      await batchUpdateCards(updates).catch(console.error);
    }
  }, []);

  return { activeItem, handleDragStart, handleDragOver, handleDragEnd };
};
