// src/Dashboard.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [planets, setPlanets] = useState([]);
    const [users, setUsers] = useState([]);
    const [explorations, setExplorations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const planetResponse = await axios.get('/api/planets');
                // console.log(planetResponse.data);
                setPlanets(planetResponse.data);
                const userResponse = await axios.get('/api/users');
                setUsers(userResponse.data);
                const explorationResponse = await axios.get('/api/explorations');
                setExplorations(explorationResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Planets</h2>
            <pre>{JSON.stringify(planets, null, 2)}</pre>
            <h2>Users</h2>
            <pre>{JSON.stringify(users, null, 2)}</pre>
            <h2>Explorations</h2>
            <pre>{JSON.stringify(explorations, null, 2)}</pre>
        </div>
    );
};

export default Dashboard;