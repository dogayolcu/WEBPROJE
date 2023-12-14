import React from 'react';

function ProjectList() {
  return (
    <div className="project-list">
      <h2>Project List</h2>
      <ul id="project-list">
      <select id="project" name="project">
        <option value="Project1">Project 1</option>
        <option value="Project2">Project 2</option>
        <option value="Project3">Project 3</option>
        <option value="Project4">Project 4</option>
      </select>
      </ul>
    </div>
  );
}

export default ProjectList;
