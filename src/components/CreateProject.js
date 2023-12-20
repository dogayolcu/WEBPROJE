import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProjectForm() {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        userIds: [] // Projeye eklenecek kullanıcıların ID'leri
    });
    const [selectedUsers, setSelectedUsers] = useState([]); // Seçilen kullanıcılar için state
    const [users, setUsers] = useState([]); // Tüm kullanıcılar için state
    const [error, setError] = useState(''); // Hata mesajları için state
    const navigate = useNavigate();

    // Kullanıcı listesini API'den almak için useEffect hook'u
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Kullanıcılar yüklenirken hata oluştu:", error);
                setError("Kullanıcılar yüklenirken bir hata oluştu.");
            }
        };
    
        fetchUsers();
    }, []);

    // Form alanlarında meydana gelen değişiklikleri işleyen fonksiyon
    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    // Kullanıcı seçimlerini işleyen fonksiyon
    const handleUserChange = (e) => {
        const selectedOptions = Array.from(e.target.options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedUsers(selectedOptions);
    };

    // Proje oluşturma isteğini gönderen fonksiyon
    const createProject = async () => {
        try {
            const projectRequestData = {
                ...projectData,
                userIds: selectedUsers
            };
            await axios.post("http://localhost:8080/api/v1/projects/save", projectRequestData);
            navigate('/kanban');
        } catch (error) {
            setError("Proje oluşturulamadı. Lütfen tekrar deneyiniz.");
        }
    };

    // Form gönderildiğinde çalışacak fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        createProject();
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Proje adı input alanı */}
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

            {/* Proje açıklaması input alanı */}
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={projectData.description} 
                    onChange={handleChange} 
                    required
                />
            </div>

            {/* Proje başlangıç tarihi input alanı */}
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

            {/* Proje bitiş tarihi input alanı */}
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

            {/* Proje durumu seçim alanı */}
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

            {/* Kullanıcı seçimi için çoklu seçim listesi */}
            <div>
                <label>Users:</label>
                <select multiple name="userIds" onChange={handleUserChange} value={selectedUsers}>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>

            {/* Form gönderme butonu */}
            <button type="submit">Create Project</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default CreateProjectForm;
