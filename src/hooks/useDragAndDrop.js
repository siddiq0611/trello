import { useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { batchUpdateCards } from "../firebase/cards";
import { batchUpdateLists } from "../firebase/lists";

export const useDragAndDrop = ({ lists, cards, setLists, setCards }) => {
  const [activeItem, setActiveItem] = useState(null);

  const findList = (id) => lists.find((l) => l.id === id);
  const findCard = (id) => cards.find((c) => c.id === id);
  const findCardList = (cardId) => {
    const card = findCard(cardId);
    return card ? findList(card.listId) : null;
  };

  const handleDragStart = useCallback(({ active }) => {
    const type = active.data.current?.type;
    if (type === "card") {
      setActiveItem({ type: "card", data: active.data.current.card });
    } else if (type === "list") {
      setActiveItem({ type: "list", data: active.data.current.list });
    }
  }, []);

  const handleDragOver = useCallback(
    ({ active, over }) => {
      if (!over) return;
      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) return;

      const activeType = active.data.current?.type;
      if (activeType !== "card") return;

      const activeCard = findCard(activeId);
      if (!activeCard) return;

      const overCard = findCard(overId);
      const overList = findList(overId);

      const targetListId = overCard
        ? overCard.listId
        : overList
          ? overId
          : null;
      if (!targetListId) return;

      if (activeCard.listId !== targetListId) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === activeId ? { ...c, listId: targetListId } : c,
          ),
        );
      }
    },
    [lists, cards],
  );

  const handleDragEnd = useCallback(
    async ({ active, over }) => {
      setActiveItem(null);
      if (!over || active.id === over.id) return;

      const activeType = active.data.current?.type;

      if (activeType === "list") {
        const oldIndex = lists.findIndex((l) => l.id === active.id);
        const newIndex = lists.findIndex((l) => l.id === over.id);
        if (oldIndex === newIndex) return;

        const reordered = arrayMove(lists, oldIndex, newIndex);
        setLists(reordered);

        const updates = reordered.map((list, idx) => ({
          id: list.id,
          data: { order: idx },
        }));
        await batchUpdateLists(updates).catch(console.error);
        return;
      }

      if (activeType === "card") {
        const activeCard = findCard(active.id);
        if (!activeCard) return;

        const overCard = findCard(over.id);
        const overList = findList(over.id);
        const targetListId = overCard
          ? overCard.listId
          : overList
            ? over.id
            : activeCard.listId;

        const targetCards = cards
          .filter((c) => c.listId === targetListId)
          .sort((a, b) => a.order - b.order);

        let reordered;
        if (activeCard.listId === targetListId) {
          const oldIdx = targetCards.findIndex((c) => c.id === active.id);
          const newIdx = overCard
            ? targetCards.findIndex((c) => c.id === over.id)
            : targetCards.length - 1;
          reordered = arrayMove(targetCards, oldIdx, newIdx);
        } else {
          const filtered = targetCards.filter((c) => c.id !== active.id);
          const insertIdx = overCard
            ? filtered.findIndex((c) => c.id === over.id)
            : filtered.length;
          filtered.splice(insertIdx, 0, {
            ...activeCard,
            listId: targetListId,
          });
          reordered = filtered;
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
    },
    [lists, cards],
  );

  return { activeItem, handleDragStart, handleDragOver, handleDragEnd };
};
