import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './components/CreateProject';
import AddProjectMember from './components/AddProjectMember';
import Kanban from './components/Kanban'; // Dosya adı büyük harfle başlamalı
import Login from './components/Login';
import ProjectDetails from './components/ProjectDetails';
import Register from './components/Register';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider> {/* UserProvider buraya taşındı */}
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/add-project-members" element={<AddProjectMember />} />
            <Route path="/project-details" element={<ProjectDetails />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
