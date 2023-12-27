import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectColumn from './ProjectColumn';
import TaskAssignModal from './TaskAssignModal';
import Buttons from './Buttons';
import { UserContext } from './UserContext';
import './styles/App.css';

const Kanban = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [cards, setCards] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [projectMembers, setProjectMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:8080/api/v1/projects/user/${user.id}/projects`)
        .then(response => setProjects(response.data))
        .catch(error => console.error("Error loading projects:", error));
    }
  }, [user]);

  useEffect(() => {
    if (selectedProjectId) {
      axios.get(`http://localhost:8080/api/v1/tasks/project/${selectedProjectId}`)
        .then(response => setCards(response.data))
        .catch(error => console.error("Error loading tasks:", error));

      axios.get(`http://localhost:8080/api/v1/projects/${selectedProjectId}/members`)
        .then(response => setProjectMembers(response.data))
        .catch(error => console.error("Error loading project members:", error));
    }
  }, [selectedProjectId]);

  const handleProjectChange = async (e) => {
    const projectId = e.target.value;
    setSelectedProjectId(projectId);
    if (projectId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/tasks/project/${projectId}`);
        setCards(response.data);
      } catch (error) {
        console.error("Error loading tasks for project:", error);
      }
    } else {
      setCards([]);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      alert('Task name cannot be empty.');
      return;
    }
    const taskData = { name: newTask, status: "TO_DO", projectId: selectedProjectId };
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/tasks`, taskData);
      if (response.data && response.data.id) {
        setCards(prevCards => [...prevCards, response.data]);
        setNewTask('');
      }
    } catch (error) {
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
    let newStatusValue;
    switch (newStatus) {
      case 'TO DO': newStatusValue = 'TO_DO'; break;
      case 'IN PROGRESS': newStatusValue = 'IN_PROGRESS'; break;
      case 'DONE': newStatusValue = 'COMPLETED'; break;
      default: return;
    }
    const updatedCards = cards.map(card => card.id === parseInt(id) ? { ...card, status: newStatusValue } : card);
    setCards(updatedCards);
    try {
      await axios.patch(`http://localhost:8080/api/v1/tasks/${id}/status`, { status: newStatusValue });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDoubleClickOnTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const assignTaskToUser = async (taskId, userId) => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/tasks/${taskId}/assign`, { userId });
      setCards(cards.map(card => card.id === taskId ? { ...card, assignedUserId: userId } : card));
      setIsModalOpen(false);
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
          {projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
        </select>
      </div>

      <div className="project-container">
        <ProjectColumn key="TO DO" title="TO DO" cards={cards.filter(card => card.status === "TO_DO")} onDragOver={onDragOver} onDrop={onDrop} onDragStart={onDragStart} onDoubleClickOnTask={handleDoubleClickOnTask} />
        <ProjectColumn key="IN PROGRESS" title="IN PROGRESS" cards={cards.filter(card => card.status === "IN_PROGRESS")} onDragOver={onDragOver} onDrop={onDrop} onDragStart={onDragStart} onDoubleClickOnTask={handleDoubleClickOnTask} />
        <ProjectColumn key="DONE" title="DONE" cards={cards.filter(card => card.status === "COMPLETED")} onDragOver={onDragOver} onDrop={onDrop} onDragStart={onDragStart} onDoubleClickOnTask={handleDoubleClickOnTask} />
      </div>

      <div className="add-task">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter new task" />
        <button onClick={addTask}>Add Task</button>
      </div>

      {isModalOpen && selectedTask && <TaskAssignModal task={selectedTask} projectMembers={projectMembers} onAssign={assignTaskToUser} onClose={() => setIsModalOpen(false)} />}
      <Buttons />
    </div>
  );
}

export default Kanban;
