import React, { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectColumn from './ProjectColumn';
import ProjectDetails from './ProjectDetails';
import Buttons from './Buttons';
import './projects.css';

function App() {
  const [cards, setCards] = useState([
    { id: 'card-1', text: 'Project 1', column: 'TO DO' },
    { id: 'card-2', text: 'Project 2', column: 'TO DO' },
    // Diğer kartlar eklenebilir
  ]);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newColumn) => {
    const id = e.dataTransfer.getData("id");
    const newCards = cards.map(card => {
      if (card.id === id) {
        card.column = newColumn;
      }
      return card;
    });
    setCards(newCards);
  };

  return (
    <div>
      <h1>MyProject</h1>
      <div className="project-container">
        <ProjectList />
        {["TO DO", "IN PROGRESS", "DONE"].map(column => (
          <ProjectColumn
            key={column}
            title={column}
            cards={cards.filter(card => card.column === column)}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragStart={onDragStart}
          />
        ))}
      </div>
      <ProjectDetails />
      <Buttons />
    </div>
  );
}

export default App;
