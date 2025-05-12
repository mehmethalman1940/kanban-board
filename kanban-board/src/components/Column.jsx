import React from 'react';
import Card from './Card';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const Column = ({ status, cards, onAddCard }) => {
  return (
    <div className="column" data-status={status}>
      <h2 className="status">{status}</h2>
      <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        {cards.length === 0 ? (
          <p>Bu statüde kart yok.</p>
        ) : (
          cards.map((card) => <Card key={card.id} {...card} />)
        )}
      </SortableContext>
      <button className="button" onClick={() => onAddCard(status)}>
        + Kart Ekle
      </button>
    </div>
  );
};

export default Column;