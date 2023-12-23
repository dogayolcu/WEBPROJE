import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './styles/AddProject.css';

function AddProjectMember() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [username, setUsername] = useState('');
  const [projectMembers, setProjectMembers] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);


  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:8080/api/v1/projects/user/${user.id}/projects`)
        .then(response => {
          setProjects(response.data);
        })
        .catch(error => {
          console.error("Error loading user projects:", error);
        });
    }
  }, [user]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  const addMemberToList = () => {

    axios.post(`http://localhost:8080/api/v1/projects/${selectedProjectId}/addMember`, { username })
      .then(() => {

        setProjectMembers((prevMembers) => [...prevMembers, username]);
        setUsername('');
        setError('');
      })
      .catch(error => {

        setError('User not found or cannot be added.');
      });
  };

  return (
    <div className="container">
      <h2>Selected Project</h2>
      <select id="project" name="project" value={selectedProjectId} onChange={handleProjectChange}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <h2>Add New Member</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projectMembers.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
        <button type="button" onClick={addMemberToList}>
          Add Member
        </button>
      </form>
    </div>
  );
}

export default AddProjectMember;
