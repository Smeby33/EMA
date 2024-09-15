import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import './styles/Personnel.css'

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
};

const Personnel = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
      

    // Récupérer les tâches depuis le localStorage lors du chargement du composant
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
        setFilteredTasks(savedTasks.filter(task => !task.isWork));  // Filtrer les tâches de type "person"
    }, []);

    return (
        <Box sx={{ backgroundColor: 'black', color: 'gold', padding: 2 }}>
            <Typography  className='text1' variant="h4" sx={{ textAlign: 'right', marginBottom: '10px' }}>
                Personnel
            </Typography>

            <List>
                {filteredTasks.length === 0 ? (
                    <Typography variant="body1" sx={{ color: 'gray' }}>
                        Aucune tâche à afficher.
                    </Typography>
                ) : (
                    filteredTasks.map((task, index) => (
                        <Tooltip key={index} title={task.description || 'Aucune description'} arrow>
                            <ListItem sx={{ borderBottom: '1px solid gray', marginBottom: 2, cursor: 'pointer' }}>
                                <ListItemText
                                    primary={task.title}
                                    secondary={formatDate(task.date)}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', marginLeft: 'auto' }}>
                                    <CalendarMonthIcon sx={{ marginRight: 1 }} />
                                    <Typography variant="body2" sx={{ color: 'white' }}>
                                        {formatDate(task.date)}
                                    </Typography>
                                    {task.completed ? (
                                        <Typography variant="body2" sx={{ color: 'gold', marginLeft: 1 }}>
                                            Complété
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" sx={{ color: 'gold', marginLeft: 1 }}>
                                            En cours
                                        </Typography>
                                    )}
                                    <IconButton>
                                        <PersonIcon sx={{ color: 'magenta' }} />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        </Tooltip>
                    ))
                )}
            </List>
            
        </Box>
    );
};

export default Personnel;
