import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Projeler yüklenirken hata oluştu:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <Link to={`/projects/${project.id}`}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            {/* Diğer proje bilgileri */}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;