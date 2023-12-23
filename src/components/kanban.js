import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectColumn from './ProjectColumn';
import Buttons from './Buttons';
import { UserContext } from './UserContext';
import './styles/App.css';

const Kanban = () => {
  const [cards, setCards] = useState([]);
  const [newProject, setNewProject] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Kullanıcının projelerini yüklemek için API isteği
    if (user && user.id) { // user ve user.id'nin kontrolü
      axios.get(`http://localhost:8080/api/v1/projects/user/${user.id}/projects`)
        .then(response => {
          // Gelen projeleri işleyerek cards'a ekleyin
          const userProjects = response.data.map(project => ({
            id: `project-${project.id}`,
            text: project.name,
            column: 'TO DO' // Varsayılan olarak her kartı 'TO DO' sütununa yerleştirin
          }));
          setCards(userProjects);
        })
        .catch(error => {
          console.error("Error loading projects:", error);
        });
    }
  }, [user]);

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
        {['TO DO', 'IN PROGRESS', 'DONE'].map((column) => (
          <ProjectColumn
            key={column}
            title={column}
            cards={cards.filter((card) => card.column === column)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column)}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      <div>
        <input
          type="text"
          style={{ width: '20%', height: '30px', marginLeft: '20px' }}
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
