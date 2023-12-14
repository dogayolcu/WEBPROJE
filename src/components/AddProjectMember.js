// AddProjectMember.js

import React, { useState } from 'react';
import './styles/AddProject.css';

function AddProjectMember() {
  const [username, setUsername] = useState('');
  const [projectMembers, setProjectMembers] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const addMemberToList = () => {
    setProjectMembers((prevMembers) => [...prevMembers, username]);
    setUsername('');
  };

  return (
    <div className="container">
      <h2>Selected Project</h2>
      <select id="project" name="project">
        <option value="Project1">Project 1</option>
        <option value="Project2">Project 2</option>
        <option value="Project3">Project 3</option>
        <option value="Project4">Project 4</option>
      </select>

      <h2>Add New Member</h2>
      <ul>
        {projectMembers.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
        <button type="addMemberbButton" onClick={addMemberToList}>
          Add Member
        </button>
      </form>
    </div>
  );
}

export default AddProjectMember;
