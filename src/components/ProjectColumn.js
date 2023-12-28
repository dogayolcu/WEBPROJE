
function ProjectColumn({ title, cards, onDragOver, onDrop, onDragStart, onDoubleClickOnTask }) {
  return (
    <div
      className="project-column"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, title)}
    >
      <h2>{title}</h2>
      <ul>
        {cards.map(card => (
          <li
            key={card.id}
            className="project-card"
            draggable="true"
            onDragStart={(e) => onDragStart(e, card.id)}
            onDoubleClick={() => onDoubleClickOnTask(card)} 
          >
            {card.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProjectColumn;
