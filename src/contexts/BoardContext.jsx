import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToLists } from "../firebase/lists";
import { subscribeToCards } from "../firebase/cards";

const BoardContext = createContext(null);

export const BoardProvider = ({ boardId, children }) => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [listsLoading, setListsLoading] = useState(true);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!boardId) return;
    setListsLoading(true);
    const unsub = subscribeToLists(boardId, (data) => {
      setLists(data);
      setListsLoading(false);
    });
    return unsub;
  }, [boardId]);

  useEffect(() => {
    if (!boardId) return;
    setCardsLoading(true);
    const unsub = subscribeToCards(boardId, (data) => {
      setCards(data);
      setCardsLoading(false);
    });
    return unsub;
  }, [boardId]);

  const getCardsForList = (listId) =>
    cards.filter((c) => c.listId === listId).sort((a, b) => a.order - b.order);

  return (
    <BoardContext.Provider
      value={{
        lists,
        cards,
        listsLoading,
        cardsLoading,
        error,
        getCardsForList,
        setLists,
        setCards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const ctx = useContext(BoardContext);
  if (!ctx)
    throw new Error("useBoardContext must be used within BoardProvider");
  return ctx;
};
