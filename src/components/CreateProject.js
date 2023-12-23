import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // UserContext'i içe aktarın

function CreateProjectForm() {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        userIds: []
    });
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // UserContext kullanarak mevcut kullanıcıyı alın

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/users");
                setUsers(response.data.filter(u => u.id !== user.id)); // Kendinizi listeden çıkarın
            } catch (error) {
                console.error("Kullanıcılar yüklenirken hata oluştu:", error);
                setError("Kullanıcılar yüklenirken bir hata oluştu.");
            }
        };
    
        fetchUsers();
    }, [user.id]); // user.id'yi bağımlılık listesine ekleyin

    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const handleUserChange = (e) => {
        const selectedOptions = Array.from(e.target.options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedUsers(selectedOptions);
    };

    const createProject = async () => {
        try {
            const projectRequestData = {
                ...projectData,
                userIds: [...selectedUsers, user.id] // Kendinizi projeye ekleyin
            };
            await axios.post("http://localhost:8080/api/v1/projects/save", projectRequestData);
            navigate('/kanban');
        } catch (error) {
            setError("Proje oluşturulamadı. Lütfen tekrar deneyiniz.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        createProject();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name"
                    value={projectData.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={projectData.description} 
                    onChange={handleChange} 
                    required
                />
            </div>

            <div>
                <label>Start Date:</label>
                <input 
                    type="date" 
                    name="startDate"
                    value={projectData.startDate} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label>End Date:</label>
                <input 
                    type="date" 
                    name="endDate"
                    value={projectData.endDate}
                    onChange={handleChange}
                    required 
                />
            </div>

            <div>
                <label>Status:</label>
                <select 
                    name="status"
                    value={projectData.status} 
                    onChange={handleChange} 
                    required>
                    <option value="">Select Status</option>
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div>
                <label>Users:</label>
                <select 
                    multiple 
                    name="userIds" 
                    onChange={handleUserChange} 
                    value={selectedUsers}
                    size={5} // Liste boyutunu ayarlayarak daha fazla kullanıcıyı görebilirsiniz
                >
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit">Create Project</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default CreateProjectForm;
