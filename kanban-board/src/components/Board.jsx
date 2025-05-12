import React, { useEffect, useState } from 'react';
import Column from './Column';
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

const Board = () => {
  const [cards, setCards] = useState([]);
  const statuses = ['BACKLOG', 'TO_DO', 'IN_PROGRESS', 'DONE'];


 
  const fetchCards = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/roadmap')
      const data = await res.json()
      if (data && Array.isArray(data.users)) {
        setCards(data.users)
      } else {
        setCards([])
      }
    } catch (err) {
      console.error('Veri çekilemedi:', err)
      setCards([]) 
    }
  }
  useEffect(() => {
    fetchCards() 
  }, [])
  



  
  const handleAddCard = async (status) => {
    const title = prompt('Kart başlığı:');
    const description = prompt('Açıklama:');
    if (!title || !description) return;

    const newCard = {
      title,
      description,
      status,
    };

    try {
      const res = await fetch('http://localhost:3000/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });
      const data = await res.json();
      setCards((prevCards) => [...prevCards, data]); 
    } catch (err) {
      console.error('Kart eklenemedi:', err);
    }
    fetchCards()
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const activeCard = cards.find((c) => c.id === active.id);
    const overCard = cards.find((c) => c.id === over.id);
 

    if (!activeCard || !overCard) return;

    if (activeCard.status === overCard.status) {
      const sameStatusCards = cards.filter((c) => c.status === activeCard.status);
      const oldIndex = sameStatusCards.findIndex((c) => c.id === active.id);
      const newIndex = sameStatusCards.findIndex((c) => c.id === over.id);
      const newOrder = arrayMove(sameStatusCards, oldIndex, newIndex);

      const reorderedCards = cards
        .filter((c) => c.status !== activeCard.status)
        .concat(newOrder);
    
      setCards(reorderedCards);
    } else {
      const newStatus = overCard.status;
      const id = activeCard.id
        const newCard = {
          id,
          newStatus
        };
        try {
          const res = await fetch('http://localhost:3000/api/roadmap', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCard),
          });
          const data = await res.json();
          setCards((prevCards) => [...prevCards, data]); 
        } catch (err) {
          console.error('Kart eklenemedi:', err);
        }
        fetchCards()
      setCards((prev) =>
        prev.map((card) =>
          card.id === active.id ? { ...card, status: overCard.status } : card
        )
      );
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));
  

  return (
    <div className='board'>
      <h1 className='boardTitle'>Kanban Board</h1>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 20px' }}>
          <SortableContext items={statuses} strategy={horizontalListSortingStrategy}>
            {statuses.map((status) => (
              <Column
                key={status}
                status={status}
                cards={cards.filter((card) => card.status === status)}
                onAddCard={handleAddCard}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default Board;
