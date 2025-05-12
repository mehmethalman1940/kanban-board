import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({ id, title, description }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  

  return (
    <div className="card" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3 className='title'>{title}</h3>
      <p className='description'>{description}</p>
    </div>
  );
};

export default Card;
