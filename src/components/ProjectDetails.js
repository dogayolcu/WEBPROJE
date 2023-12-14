import React from 'react';

const ProjectDetails = () => {
  return (
    <div className="container">
      <div className="project-details">
        
      <h2>Selected Project</h2>

      <select id="project" name="project">
        <option value="Project1">Project 1</option>
        <option value="Project2">Project 2</option>
        <option value="Project3">Project 3</option>
        <option value="Project4">Project 4</option>
      </select>

        <h2>Project Members</h2>
        <ul>
          <li>Member 1</li>
          <li>Member 2</li>
          <li>Member 3</li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;
