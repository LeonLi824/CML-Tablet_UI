import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const inProgress = () => {
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const { taskId } = useParams(); // Should Get taskId dynamically from the URL hopefully
 
    useEffect(() => {
        if (!taskId) return; // Prevent API call if taskId is missing

        const fetchTaskStatus = async () => {
            try {
                const response = await fetch(`https://localhost:4000/api/cart/task?taskId=${taskId}`, {
                    method: 'GET', credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStatus(data.status);

                    // When status of task is waiting it would hopefully redirect to tabletLogin
                    if (data.status === "Waiting") {
                        navigate("/tabletLogin");
                    }
                } else {
                    console.error("Failed to fetch task status");
                }
            } catch (error) {
                console.error("Error fetching task status:", error);
            }
        };

        // Check every 3 seconds
        const interval = setInterval(fetchTaskStatus, 3000);

        return () => clearInterval(interval);
    }, [taskId, navigate]);

    return (
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '3rem',
        fontWeight: 'bold'
        }}>
        <div>C.A.M.L Moving to Pick Up Location</div>
        <motion.div 
            style={{ fontSize: '1.5rem', color: 'blue' }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            WARNING! DO NOT INTERUPT MOVING VEHICLE!
        </motion.div>
        </div>
  );
};

export default inProgress;