import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './components/CreateProject';
import AddProjectMember from './components/AddProjectMember';
import Kanban from './components/kanban'
import Login from './components/Login';
import ProjectDetails from './components/ProjectDetails';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import UserTasks from './components/UserTasks';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/add-project-members" element={<AddProjectMember />} />
            <Route path="/project-details" element={<ProjectDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/user-tasks" element={<UserTasks />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
