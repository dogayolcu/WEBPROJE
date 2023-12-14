// Kanban.js
import React, { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectColumn from './ProjectColumn';
import Buttons from './Buttons';
import './styles/App.css';

const Kanban= () => {
  const [cards, setCards] = useState([
    { id: 'card-1', text: 'Project 1', column: 'TO DO' },
    { id: 'card-2', text: 'Project 2', column: 'TO DO' },
    // Diğer kartlar eklenebilir
  ]);

  const [newProject, setNewProject] = useState('');

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newColumn) => {
    const id = e.dataTransfer.getData('id');
    const newCards = cards.map((card) => {
      if (card.id === id) {
        card.column = newColumn;
      }
      return card;
    });
    setCards(newCards);
  };

  const handleAddProject = () => {
    if (newProject.trim() !== '') {
      const newCard = {
        id: `card-${cards.length + 1}`,
        text: newProject,
        column: 'TO DO',
      };
      setCards([...cards, newCard]);
      setNewProject('');
    }
  };

  return (
    <div>
      <div className="project-container">
        <ProjectList />
        {['TO DO', 'IN PROGRESS', 'DONE'].map((column) => (
          <ProjectColumn
            key={column}
            title={column}
            cards={cards.filter((card) => card.column === column)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column)}
            onDragStart={onDragStart}
            onAddProject={handleAddProject}
          />
        ))}
      </div>

      {/* Yeni proje eklemek için input ve buton */}
      <div>
        <input
          type="text"
          style={{ width: '20%', height: '30px',marginLeft: '20px' }}
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddProject}>Add Task</button>
      </div>
      <Buttons />
    </div>
    
  );
}

export default Kanban;
