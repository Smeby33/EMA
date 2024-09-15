import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, IconButton, Checkbox, Tooltip, TextField, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Fonction pour formater la date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
};

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({ title: '', description: '', date: '', isWork: false });

    // Récupérer les tâches depuis le localStorage lors du chargement du composant
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    // Enregistrer les tâches dans le localStorage
    const saveTasks = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const startEditing = (index) => {
        const taskToEdit = tasks[index];
        setEditingTaskId(index);
        setEditedTask({ ...taskToEdit });
    };

    const saveTaskEdit = () => {
        const updatedTasks = tasks.map((task, index) =>
            index === editingTaskId ? editedTask : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setEditingTaskId(null);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    return (
        <Box sx={{ backgroundColor: 'black', color: 'gold', padding: 2 }}>
            <Typography  className='text1' variant="h4" sx={{ textAlign: 'right', marginBottom: '10px' }} >Gestion des tâches</Typography>
            <List>
                {tasks.length === 0 ? (
                    <Typography variant="body1" sx={{ color: 'gray' }}>
                        Aucune tâche à afficher.
                    </Typography>
                ) : (
                    tasks.map((task, index) => (
                        <ListItem key={index} sx={{ borderBottom: '1px solid gray', marginBottom: 2 }}>
                            {editingTaskId === index ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <TextField
                                        label="Titre"
                                        value={editedTask.title}
                                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                        fullWidth
                                        sx={{ marginBottom: 2, backgroundColor: '#313030', color: 'white' }}
                                    />
                                    <TextField
                                        label="Description"
                                        value={editedTask.description}
                                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                        fullWidth
                                        sx={{ marginBottom: 2, backgroundColor: '#313030', color: 'white' }}
                                    />
                                    <TextField
                                        label="Date"
                                        type="date"
                                        value={editedTask.date}
                                        onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
                                        fullWidth
                                        sx={{ marginBottom: 2, backgroundColor: '#313030', color: 'white' }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={saveTaskEdit}
                                    >
                                        Sauvegarder
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <Typography variant="h6">
                                            {task.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'gray' }}>
                                            {formatDate(task.date)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title={task.description || 'Aucune description'} arrow>
                                            <Checkbox
                                                checked={task.completed || false}
                                                onChange={() => toggleComplete(index)}
                                                sx={{ color: 'white' }}
                                            />
                                        </Tooltip>
                                        <IconButton onClick={() => startEditing(index)}>
                                            <EditIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteTask(index)}>
                                            <DeleteIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                        {task.isWork ? (
                                            <WorkIcon sx={{ color: 'blue' }} />
                                        ) : (
                                            <PersonIcon sx={{ color: 'magenta' }} />
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
};

export default TaskManager;
