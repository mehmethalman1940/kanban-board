import Card from './Card';
import { v4 as uuidv4 } from 'uuid';// Benzersiz bir id üretebilmek için.

const Column = ({ columnId, column, columns, setColumns }) => {
  const handleAddCard = () => {
  const title = prompt('Kart başlığı:'); // Başlığı al
  if (!title) return;

  const content = prompt('Kart içeriği:'); // İçeriği al
  if (!content) return;

  const newCard = {//Yeni kartı oluşturduk.
    id: uuidv4(),
    title, // Başlık
    content // İçerik
  };

  const updatedItems = [...column.items, newCard];// Yeni kartı ekliyoruz
  const updatedColumns = {
    ...columns,
    [columnId]: { ...column, items: updatedItems }
  };
  setColumns(updatedColumns); //Yeni kartı set ediyoruz.
};

  return (
    <div className="column">
      <h2>{column.name}</h2>
      <div className="card-list">
        {column.items.map((item) => (// Her bir items Card bileşenini döndürüyoruz.
          <Card
            key={item.id}
            item={item}
            columnId={columnId}
          />
        ))}
      </div>
      <button className="button" onClick={handleAddCard}>✏️ Kart Ekle</button>
    </div>
  );
};

export default Column;
