import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({ item, columnId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: item.id,
    data: {
      columnId
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform), // DnD pozisyon dönüşümü
    transition, // DnD animasyonu
    backgroundColor: getColorByColumn(columnId), // Kolon rengine göre kart rengi
    padding: '10px', 
    margin: '8px 0', 
    borderRadius: '8px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)', 
    cursor: 'grab' // Sürükleme imleci
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.title}</div> {/* Başlık */}
      <div>{item.content}</div> {/* İçerik */}
    </div>
  );
};

const getColorByColumn = (columnId) => {// Burada columnId'ye göre card
  switch (columnId) {
    case 'backlog':
      return '#f5f5f5';// Gri
    case 'todo':
      return '#fff8dc';// Açık sarı
    case 'inProgress':
      return '#e0f7fa';// Açık mavi
    case 'done':
      return '#d0f0c0';  // Açık yeşil
    default:
      return '#ffffff';
  }
};

export default Card;
