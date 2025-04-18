import { useEffect, useState } from 'react';
import Column from './Column';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { getBoardData, saveBoardData } from '../services/boardService';

const Board = ({ boardId }) => { // Burada her boarda özel id alıyoruz.
  const [columns, setColumns] = useState({});

  useEffect(() => {
    const stored = getBoardData(boardId); // Bu kod bloğu boardId her tetiklendiğinde setColumns'u localStorageden gelen stored ile set eder.
    setColumns(stored);
  }, [boardId]);

  const updateColumns = (updated) => {// Bu kod bloğunda stateyi güncelleyip yeni hali localStorageye kaydediyoruz
    setColumns(updated);
    saveBoardData(boardId, updated);
  };
// Sürükle bırak işlemleri 
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return; // Sürüklenen ve bırakılan elemanları al aynı yere bırakıldıysa işlem yapma.

    const fromColumnId = active.data.current.columnId;
    const toColumnId = over.data.current.columnId;

    const fromItems = [...columns[fromColumnId].items];
    const toItems = [...columns[toColumnId].items];

    const activeIndex = fromItems.findIndex(i => i.id === active.id);
    const overIndex = toItems.findIndex(i => i.id === over.id);

    const [movedItem] = fromItems.splice(activeIndex, 1);
// Aynı listede sıralama değişikliği
    if (fromColumnId === toColumnId) {
      fromItems.splice(overIndex, 0, movedItem);
      updateColumns({
        ...columns,
        [fromColumnId]: { ...columns[fromColumnId], items: fromItems }
      });
    } else {
      // Farklı listeye taşınıyorsa
      toItems.splice(overIndex, 0, movedItem);
      updateColumns({
        ...columns,
        [fromColumnId]: { ...columns[fromColumnId], items: fromItems },
        [toColumnId]: { ...columns[toColumnId], items: toItems }
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        {Object.entries(columns).map(([key, column]) => (
          <SortableContext
            key={key}
            items={column.items.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <Column
              columnId={key}
              column={column}
              columns={columns}
              setColumns={updateColumns}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
