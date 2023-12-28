import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

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

    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserTasks;
