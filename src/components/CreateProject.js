import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './styles/AddProject.css';

function CreateProjectForm() {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: ''
    });
    const [usernameToAdd, setUsernameToAdd] = useState('');
    const [addedUsers, setAddedUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const handleUsernameChange = (e) => {
        setUsernameToAdd(e.target.value);
    };

    const addUserToProject = () => {
        axios.get(`http://localhost:8080/api/v1/users/username/${usernameToAdd}`)
            .then(response => {
                if (response.data) {
                    setAddedUsers(prevAddedUsers => [...prevAddedUsers, usernameToAdd]);
                    setUsernameToAdd('');
                }
            })
            .catch(() => {
                setError('User not found');
            });
    };

    const removeUserFromList = (username) => {
        setAddedUsers(addedUsers.filter(user => user !== username));
    };


    const createProject = async () => {
        setError('');
        try {
            const userIds = await Promise.all(
                addedUsers.map(username => 
                    axios.get(`http://localhost:8080/api/v1/users/username/${username}`)
                        .then(response => {
                            if (response.data) {
                                return response.data.id;
                            } else {
                                throw new Error('User not found');
                            }
                        })
                        .catch(error => {
                            throw new Error(`Error retrieving user ID for ${username}: ${error.message}`);
                        })
                )
            );
    
            if (user && user.id && !userIds.includes(user.id)) {
                userIds.push(user.id);
            }
    
            const projectRequestData = {
                ...projectData,
                userIds: userIds
            };
    
            await axios.post("http://localhost:8080/api/v1/projects/save", projectRequestData);
            navigate('/kanban');
        } catch (error) {
            setError(`Project creation failed: ${error.message}`);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        createProject();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={projectData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={projectData.description} 
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input 
                        type="date" 
                        id="startDate"
                        name="startDate"
                        value={projectData.startDate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input 
                        type="date" 
                        id="endDate"
                        name="endDate"
                        value={projectData.endDate}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="status">Status:</label>
                    <select 
                        id="status"
                        name="status"
                        value={projectData.status} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="usernameToAdd">Add User by Username:</label>
                    <input
                        type="text"
                        id="usernameToAdd"
                        name="usernameToAdd"
                        value={usernameToAdd}
                        onChange={handleUsernameChange}
                    />
                    <button type="button" onClick={addUserToProject}>Add</button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
                <ul>
                    <h3>Added Members</h3>
                    {addedUsers.map((username, index) => (
                        <li key={index}>
                            {username} 
                            <button onClick={() => removeUserFromList(username)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
}
export default CreateProjectForm;