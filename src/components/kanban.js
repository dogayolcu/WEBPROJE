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

  useEffect(() => {
    // Proje bilgilerini yükle
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

  /*useEffect(() => {
    // Seçili projeye ait task'ları yükle
    if (selectedProjectId) {
      axios.get(`http://localhost:8080/api/v1/tasks/project/${selectedProjectId}`)
        .then(response => {
          setCards(response.data);
        })
        .catch(error => {
          console.error("Error loading tasks:", error);
        });
    }
  }, [selectedProjectId]);*/

  const addTask = async () => {
    if (!newTask.trim()) {
      alert('Task name cannot be empty.');
      return;
    }
  
    const taskData = {
      name: newTask,
      status: "TO DO",
      projectId: selectedProjectId
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/tasks/createTask', taskData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      handleAddTask();
      setCards([...cards, response.data]);
      setNewTask('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newCard = {
        id: `card-${cards.length + 1}`,
        text: newTask,
        column: 'TO DO',
      };
      setCards([...cards, newCard]);
      setNewTask('');
    }
  };
  
  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e, newStatus) => {
    const id = e.dataTransfer.getData('id');
    let updatedCard;
    const newCards = cards.map(card => {
      if (card.id === id) {
        card.status = newStatus;
        updatedCard = card;
      }
      return card;
    });
   
  

    if (updatedCard) {
      try {
        await axios.post(`http://localhost:8080/api/v1/tasks/updateStatus`, {
          id: updatedCard.id,
          status: newStatus
        });
        setCards(newCards);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
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

      <div className="hello">
        {user && user.name && <h1> Hello, {user.name}! </h1>}
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
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      <Buttons />
    </div>
  );
}

export default Kanban;
