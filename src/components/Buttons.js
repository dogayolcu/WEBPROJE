

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Buttons.css';

function Buttons() {
  return (
    <div className="button-container">
      <Link to="/create-project">
        <button>Create New Project</button>
      </Link>
      <Link to="/add-project-members">
        <button>Add Project Members</button>
      </Link>
      <Link to="/project-details">
        <button>View Project Members</button>
        </Link>
    </div>
  );
}

export default Buttons;