import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControlLabel, Checkbox, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import './styles/AddTaskForm.css';

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isWork, setIsWork] = useState(false);
    const [isPerso, setIsPerso] = useState(false);
    const [tasks, setTasks] = useState([]);

    // Récupérer les tâches depuis le localStorage au chargement initial
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Créer une nouvelle tâche
        const newTask = {
            title,
            description,
            date,
            isWork,
            isPerso,
            id: Date.now(), // Utiliser un timestamp comme identifiant unique
        };

        // Ajouter la nouvelle tâche à la liste existante
        const updatedTasks = [...tasks, newTask];

        // Sauvegarder la liste des tâches dans le localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        // Mettre à jour l'état local
        setTasks(updatedTasks);

        // Réinitialiser les champs du formulaire
        setTitle('');
        setDescription('');
        setDate('');
        setIsWork(false);
        setIsPerso(false);
    };

    return (
        <Box sx={{ backgroundColor: 'black', color: 'gold', padding: 2, display:'flex',alignItems:'center',flexDirection:'column' }}>
            <Typography className='texth4' variant="h4">Saisissez votre tâche</Typography>
            <form className='formulaire' onSubmit={handleSubmit}>
                <Typography className='texth6' variant="h6">Titre</Typography>
                <TextField
                    label=" "
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ 
                        marginBottom:'0.5px',
                        backgroundColor: '#313030',
                        height: '60px',
                        borderRadius: '4px',
                        fontSize: '1.2rem' 
                    }}
                />
    
                <Typography className='texth6' variant="h6">Description</Typography>
                <TextField
                    label=" "
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ 
                        marginBottom: 2, 
                        backgroundColor: '#313030',
                        borderRadius: '4px', 
                        fontSize: '1.2rem', 
                    }}
                />
    
                <Typography className='texth6' variant="h6">Date</Typography>
                <TextField 
                    className='inputField'
                    label=" "
                    type="date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{ 
                        marginBottom: 2, 
                        backgroundColor: '#313030',
                        width: '40%', 
                        borderRadius: '4px',
                        fontSize: '2rem',
                        padding: '1px',
                    }}
                    InputLabelProps={{ shrink: true }}
                />
    
                <div className="TypeTache">
                    <FormControlLabel
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WorkIcon sx={{ color: 'blue', marginRight: 1 }} />
                            </Box>
                        }
                        control={
                            <Box sx={{ backgroundColor: '#313030', width: '21px', height: '21px'}}>
                                <Checkbox 
                                    sx={{ 
                                        width: '100%',
                                        height: '21px', 
                                        display: 'flex', 
                                        alignItems: 'center' 
                                    }}    
                                    checked={isWork} 
                                    onChange={() => setIsWork(!isWork)} 
                                />
                            </Box>
                        }
                    />
        
                    <FormControlLabel
                        control={ 
                            <Box sx={{ backgroundColor: '#313030', width: '21px', height: '21px'}}>
                                <Checkbox 
                                    sx={{ 
                                        width: '100%',
                                        height: '21px', 
                                        display: 'flex', 
                                        alignItems: 'center' 
                                    }}   
                                    checked={isPerso} 
                                    onChange={() => setIsPerso(!isPerso)} 
                                />
                            </Box>
                        }
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ color: 'magenta', marginRight: 1 }} />
                            </Box>
                        }
                    />
                </div> 
                <div className="btn-envoyer">
                <Button type="submit" variant="contained" color="black" sx={{backgroundColor:'gold',color:'black'}}>Valider</Button>
                </div>
            </form>
        </Box>
    );
};

export default AddTaskForm;
