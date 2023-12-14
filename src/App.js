// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './components/CreateProject';
import AddProjectMember from './components/AddProjectMember';
import Kanban from './components/kanban';
import Login from './components/Login';
import ProjectDetails from './components/ProjectDetails';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> Login sayfasını ana sayfa olarak ayarlayın 
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/add-project-members" element={<AddProjectMember />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="./componets/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
