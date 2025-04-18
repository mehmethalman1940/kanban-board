import { useParams } from 'react-router-dom';
import Board from '../components/Board';

const BoardPage = () => {
  const { boardId } = useParams(); // URL'den ID al

  return (
    <div>
      <Board boardId={boardId} />
    </div>
  );
};

export default BoardPage;
