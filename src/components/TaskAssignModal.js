import React, { useState } from 'react';

function TaskAssignModal({ task, projectMembers, onAssign, onClose }) {
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleAssignClick = () => {
    if (selectedUserId) {
      onAssign(task.id, selectedUserId);
      setSelectedUserId('');
      onClose(); 
    } else {
      alert("Please select a member to assign the task.");
    }
  };

  
  if (!task || !projectMembers) {
    return null;
  }

  return (
    <div className="task-assign-modal">
      <div className="modal-content">
        <h2>Assign Task</h2>
        <p>Task: {task.name}</p>
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
        <div className="modal-actions">
          <button onClick={handleAssignClick}>Assign</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default TaskAssignModal;
