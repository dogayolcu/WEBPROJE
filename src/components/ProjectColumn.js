import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectColumn({ title, cards, onDragOver, onDrop, onDragStart }) {
  return (
    <div
      className="project-column"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, title)}
    >
      <h2>{title}</h2>
      <ul>
        {cards.map(card => (
          <ProjectCard
            key={card.id}
            id={card.id}
            text={card.text}
            onDragStart={(e) => onDragStart(e, card.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProjectColumn;
