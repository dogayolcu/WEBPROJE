
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './styles/UserTasks.css';

function UserTasks() {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:8080/api/v1/tasks/user/${user.id}`)
                .then(response => {
                    setTasks(response.data);
                })
                .catch(error => {
                    console.error('Error fetching tasks', error);
                });
        }
    }, [user]);



    const tasksByProjectName = tasks.reduce((acc, task) => {
        const projectName = task.projectName || 'Unknown Project';
        acc[projectName] = acc[projectName] || [];
        acc[projectName].push(task);
        return acc;
    }, {});

    return (
        <div className="user-tasks">
            <h2>Your Tasks</h2>
            {Object.keys(tasksByProjectName).map(projectName => (
                <div key={projectName} className="project-tasks">
                    <h3>{projectName}</h3>
                    <ul>
                        {tasksByProjectName[projectName].map(task => (
                            <li key={task.id} className="task-item">
                                {task.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default UserTasks;
