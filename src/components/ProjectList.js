import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/projects/userProjects');
        setProjects(response.data);
      } catch (error) {
        console.error("Projeler yüklenirken bir hata oluştu", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>Project List</h2>
      <ul id="project-list">
        <select id="project" name="project">
          {projects.map((project, index) => (
            <option key={index} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </ul>
    </div>
  );
}

export default ProjectList;
