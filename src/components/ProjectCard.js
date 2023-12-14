import React from 'react';

function ProjectCard({ id, text, onDragStart }) {
  return (
    <li
      className="project-card"
      draggable="true"
      onDragStart={(e) => onDragStart(e, id)}
    >
      {text}
    </li>
  );
}

export default ProjectCard;
