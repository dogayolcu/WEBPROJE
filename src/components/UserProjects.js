import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

function UserProjects() {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:8080/api/v1/projects/user/${user.id}/projects`)
        .then(response => setProjects(response.data))
        .catch(error => console.error("Error loading projects:", error));
    }
  }, [user]);


  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name} - {project.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProjects;
