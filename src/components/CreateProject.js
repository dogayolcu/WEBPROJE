import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProjectForm() {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const createProject = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/projects/save", projectData);
            navigate('/kanban');
        } catch (error) {
            // Hata mesajını daha sağlam bir şekilde ele almak için güncelleme
            if (error.response && error.response.data && error.response.data.message) {
                setError("Proje oluşturulamadı: " + error.response.data.message);
            } else {
                setError("Proje oluşturulamadı. Lütfen tekrar deneyiniz.");
            }
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

            <button type="submit">Create Project</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default CreateProjectForm;
