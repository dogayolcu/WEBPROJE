// components/CreateProject.js

import React, { useState } from 'react';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleCreateProject = () => {
    // Bu kısımda, proje oluşturma işlemleri gerçekleştirilebilir.
    console.log('Proje oluşturuldu:', projectName, projectDescription);
  };

  return (
    <div className="container">
      <h2>Create New Project</h2>
      <form>
        <label>
          Project Name:
          <input type="ProjectNameText" value={projectName} onChange={handleProjectNameChange} />
        </label>
        <br />
        <label>
          Project Description:    
          <textarea
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            style={{ width: '100%', height: '100px', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </label>
        <br />
        <button type="createButton" onClick={handleCreateProject}>
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
