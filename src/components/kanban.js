import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectColumn from './ProjectColumn';
import TaskAssignPanel from './TaskAssignPanel';
import Buttons from './Buttons';
import { UserContext } from './UserContext';
import './styles/App.css';

const Kanban = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [cards, setCards] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [projectMembers, setProjectMembers] = useState([]);
  const [showAssignPanel, setShowAssignPanel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(UserContext);

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

  useEffect(() => {
    if (selectedProjectId) {
      axios.get(`http://localhost:8080/api/v1/tasks/project/${selectedProjectId}`)
        .then(response => {
          setCards(response.data);
        })
        .catch(error => {
          console.error("Error loading tasks:", error);
        });

      axios.get(`http://localhost:8080/api/v1/projects/${selectedProjectId}/members`)
        .then(response => {
          setProjectMembers(response.data);
        })
        .catch(error => {
          console.error("Error loading project members:", error);
        });
    }
  }, [selectedProjectId]);

  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      alert('Task name cannot be empty.');
      return;
    }
  
    const taskData = {
      name: newTask,
      status: "TO_DO",
      projectId: selectedProjectId
    };
  
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/tasks`, taskData);
  
      // Yanıtı kontrol etmek ve doğru veriyi almak için
      if (response.data && response.data.id && response.data.name) {
        // Yeni task'ı mevcut task listesine ekle
        setCards(prevCards => [...prevCards, response.data]);
      } else {
        // Yanıt beklenen formatta değilse, bir hata mesajı logla
        console.error("Invalid task data received:", response.data);
      }
  
      // Input alanını temizle
      setNewTask('');
    } catch (error) {
      // Hata oluşursa konsola yaz
      console.error("Error adding task:", error);
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
        updatedCard = { ...card, status: newStatus };
        return updatedCard;
      }
      return card;
    });

    if (updatedCard) {
      try {
        await axios.patch(`http://localhost:8080/api/v1/tasks/${id}/status`, { status: newStatus });
        setCards(newCards);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  const openAssignPanel = (task) => {
    setSelectedTask(task);
    setShowAssignPanel(true);
  };

  const assignTaskToUser = async (taskId, userId) => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/tasks/${taskId}/assign`, { userId });
      setCards(cards.map(card => card.id === taskId ? { ...card, assignedUserId: userId } : card));
      setShowAssignPanel(false);
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  return (
    <div className="kanban-board">
      <div className="project-dropdown">
        <label htmlFor="project-select">Choose a project:</label>
        <select id="project-select" onChange={handleProjectChange}>
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="project-container">
        {['TO DO', 'IN PROGRESS', 'DONE'].map((status) => (
          <ProjectColumn
            key={status}
            title={status}
            cards={cards.filter((card) => card.status === status)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
            onDragStart={onDragStart}
            onCardClick={openAssignPanel}
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

      {showAssignPanel && selectedTask && (
        <TaskAssignPanel
          task={selectedTask}
          projectMembers={projectMembers}
          onAssign={assignTaskToUser}
        />
      )}

      <Buttons />
    </div>
  );
}

export default Kanban;
