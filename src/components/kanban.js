import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectColumn from './ProjectColumn';
import Buttons from './Buttons';
import { UserContext } from './UserContext';
import './styles/App.css';

const Kanban = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [cards, setCards] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { user } = useContext(UserContext);

  // Projeleri yükleme
  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:8080/api/v1/projects/user/${user.id}/projects`)
        .then(response => {
          setProjects(response.data);
        })
        .catch(error => {
          console.error("Error loading projects:", error);
        });
    }
  }, [user]);

  // Seçilen projenin görevlerini yükleme
  useEffect(() => {
    if (selectedProjectId) {
      axios.get(`http://localhost:8080/api/v1/tasks/project/${selectedProjectId}`)
        .then(response => {
          setCards(response.data);
        })
        .catch(error => {
          console.error("Error loading tasks:", error);
        });
    }
  }, [selectedProjectId]);

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

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      // API'ye yeni görev ekleme isteği yapılır
      // Örnek olarak burada cards state'ine direkt ekleniyor
      setCards([...cards, { id: Date.now(), text: newTask, column: 'TO DO' }]);
      setNewTask('');
    }
  };

  return (
    <div className="kanban-board">
      <div className="project-dropdown">
        <label htmlFor="project-select">Choose a project:</label>
        <select id="project-select" onChange={(e) => setSelectedProjectId(e.target.value)}>
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

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

        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>

      <Buttons />
    </div>
  );
}

export default Kanban;
