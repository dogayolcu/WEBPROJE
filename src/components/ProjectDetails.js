import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:8080/api/v1/projects/user/${user.id}/projects`)
        .then(response => setProjects(response.data))
        .catch(error => console.error("Error loading user projects:", error));
    }
  }, [user]);

  useEffect(() => {
    if (selectedProjectId) {
      axios.get(`http://localhost:8080/api/v1/projects/${selectedProjectId}/members`)
        .then(response => setMembers(response.data))
        .catch(error => console.error("Error loading project members:", error));
    }
  }, [selectedProjectId]);

  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="project-details">
        <h2>Selected Project</h2>
        <select id="project" name="project" value={selectedProjectId} onChange={handleProjectChange}>
          <option value="">Select a project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>

        <input 
          type="text" 
          placeholder="Search by member name..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />

        <h2>Project Members</h2>
        <ul>
          {filteredMembers.map(member => (
            <li key={member.id}>{member.name} {member.surname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;
