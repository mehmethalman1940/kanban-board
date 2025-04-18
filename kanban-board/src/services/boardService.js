const getBoardData = (boardId) => {
  const data = localStorage.getItem(`board-${boardId}`);
  if (data) {
    return JSON.parse(data);
  }
  return {
    backlog: { name: "Backlog", items: [] },
    todo: { name: "To Do", items: [] },
    inProgress: { name: "In Progress", items: [] },
    done: { name: "Done", items: [] },
  };
};

const saveBoardData = (boardId, data) => {
  localStorage.setItem(`board-${boardId}`, JSON.stringify(data));
};

export { getBoardData, saveBoardData };
