import React, { useState } from 'react';

function TaskAssignPanel({ task, projectMembers, onAssign }) {
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleAssignClick = () => {
    onAssign(task.id, selectedUserId);
    setSelectedUserId(''); 
  };

  return (
    <div className="task-assign-panel">
      <h3>Assign Task: {task.name}</h3>
      <div>
        <label htmlFor="user-select">Assign to: </label>
        <select
          id="user-select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a member</option>
          {projectMembers.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAssignClick}>Assign</button>
    </div>
  );
}

export default TaskAssignPanel;
