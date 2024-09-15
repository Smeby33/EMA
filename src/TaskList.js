import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import './styles/TaskList.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
};

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    // Récupérer les tâches depuis le localStorage lors du chargement du composant
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
        setFilteredTasks(savedTasks);  // Initialement, filtrer toutes les tâches
    }, []);

    const filterTasks = (status) => {
        const today = new Date();
        let filtered = [];
        if (status === 'complete') {
            filtered = tasks.filter((task) => task.completed);
        } else if (status === 'encours') {
            filtered = tasks.filter((task) => !task.completed && new Date(task.date) <= today);
        } else {
            filtered = tasks;  // 'all'
        }
        setFilteredTasks(filtered);
    };

    return (
        <Box sx={{ backgroundColor: 'black', color: 'gold', padding: 2 }}>
            <Typography className='text1' variant="h4" sx={{ textAlign: 'right', marginBottom: '10px' }}>
                Liste des tâches
            </Typography>

            {/* Boutons de filtre */}
            <div className='box-3btn'>
                <button
                    className='btn-tout'
                    color="gold"
                    sx={{ marginRight: 1 }}
                    onClick={() => filterTasks('all')}
                >
                    Tout
                </button>
                <div id="box-2btn">
                    <button
                        className='btn-completer'
                        color="gold"
                        onClick={() => filterTasks('complete')}
                    >
                        Complété
                    </button>
                    <button
                        className='btn-encours'
                        color="gold"
                        onClick={() => filterTasks('encours')}
                    >
                        En cours
                    </button>
                </div>
            </div>

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
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', marginLeft: 'auto' ,}}>
                                    
                                        <CalendarMonthIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body2" sx={{ color: 'white', marginRight: 1, }}>
                                            {formatDate(task.date)}
                                        </Typography>
                                    
                                        {task.completed ? (
                                            <Typography variant="body2" sx={{ color: 'gold', marginRight: 1 }}>
                                                Complété
                                            </Typography>
                                        ) : !task.completed && new Date(task.date) <= new Date() ? (
                                            <Typography variant="body2" sx={{ color: 'gold', marginRight: 1 }}>
                                                En cours
                                            </Typography>
                                        ) : null}
                                        <IconButton>
                                            {task.isWork ? (
                                                <WorkIcon sx={{ color: 'blue' }} />
                                            ) : (
                                                <PersonIcon sx={{ color: 'magenta' }} />
                                            )}
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

export default TaskList;
