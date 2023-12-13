import React from 'react';

function ProjectList() {
  return (
    <div className="project-list">
      <h2>Project List</h2>
      <ul id="project-list">
        <li className="project-card" draggable="true">project 1</li>
        <li className="project-card" draggable="true">project 2</li>
      </ul>
    </div>
  );
}

export default ProjectList;
