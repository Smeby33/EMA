import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Parrametre from './parrametre';
import TaskManager from './TaskManager';
import Travail from './Travail';
import Personnel from './Personnel';
import Auth from './Auth';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import SettingsPanel from './SettingsPanel';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './App.css';

function ouvrirWhatsApp() { 
  var numero = '+241077679339';
  var message = 'je voudrais vous demander si ';
  var url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(message);

  // Redirection automatique
  window.location.href = url;
}

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  const [viewForm, setViewForm] = useState(false);
  const [viewList, setViewList] = useState(true);
  const [viewManager, setViewManager] = useState(false);
  const [viewTravail, setViewTravail] = useState(false);
  const [viewPersonnel, setViewPersonnel] = useState(false);
  const [viewSettings, setViewSettings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);  // Une fois connecté, mettre à jour l'état
  };

  if (!isAuthenticated) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;  // Afficher la page de connexion/inscription si non authentifié
  }
    // Déconnexion
    const handleLogout = () => {
      setIsAuthenticated(false);  // Simule une déconnexion
    };
     // Supprimer toutes les tâches
  const deleteAllTasks = () => {
    setTasks([]);
  };
    // Supprimer la dernière tâche
    const deleteLastTask = () => {
      setTasks(tasks.slice(0, -1));
    };
     // Mettre à jour une tâche (complétée ou autre modification)
  const updateTask = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };
  // Ajouter une tâche
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app-container">
      <div className="par">
      <Parrametre onClick={() => setViewSettings(true)} />
      </div>
      {/* Bouton pour mobile/tablette */}
      {screenWidth <= 810 && (
        <Button className="menu-toggle" onClick={toggleSidebar}>
          <MenuIcon sx={{ color: 'gold' }} />
        </Button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <Parrametre onClick={() => setViewSettings(true)} />
        <div className="btnsider">
          <button onClick={() => { setViewForm(true); setViewList(false); setViewManager(false); setViewPersonnel(false); setViewTravail(false); }}>
                <AddCircleOutlineIcon sx={{ fontSize: '2em' }} />
                Ajouter une tâche
          </button>
          <button onClick={() => { setViewForm(false); setViewList(true); setViewManager(false); setViewPersonnel(false); setViewTravail(false); }}>
              <WidgetsIcon sx={{ fontSize: '2em' }} />
              Liste des tâches 
          </button>
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(true); setViewPersonnel(false); setViewTravail(false); }}>
              <CalendarMonthIcon sx={{ fontSize: '2em' }} />
              Gestion des tâches  
          </button>
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(false); setViewTravail(true); setViewPersonnel(false); }}>
              <WorkIcon sx={{ fontSize: '2em' }} />
              Travail  
          </button>
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(false); setViewTravail(false); setViewPersonnel(true); }}>
              <PersonIcon sx={{ fontSize: '2em' }} />
              Personnel  
          </button>
          <button onClick={ouvrirWhatsApp}>
              WhatsApp
          </button>
          {/* Autres boutons */}
        </div>
      </div>
      <div className="sidebar2">
        {/* Ajouter un gestionnaire d'événements pour ouvrir le SettingsPanel */}
        <Parrametre onClick={() => setViewSettings(true)} />
        <div className="btnsider2">
          {/* Bouton pour afficher le formulaire d'ajout de tâche */}
          <button onClick={() => { setViewForm(true); setViewList(false); setViewManager(false); setViewPersonnel(false); setViewTravail(false) }}>
            <AddCircleOutlineIcon sx={{ fontSize: '2em' }} />
            Ajouter une tâche
          </button>

          {/* Bouton pour afficher la liste des tâches */}
          <button onClick={() => { setViewForm(false); setViewList(true); setViewManager(false); setViewPersonnel(false); setViewTravail(false) }}>
            <WidgetsIcon sx={{ fontSize: '2em' }} />
            Liste des tâches 
          </button>

          {/* Bouton pour afficher le gestionnaire de tâches */}
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(true); setViewPersonnel(false); setViewTravail(false) }}>
            <CalendarMonthIcon sx={{ fontSize: '2em' }} />
            Gestion des tâches  
          </button>

          {/* Autres boutons */}
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(false); setViewTravail(true); setViewPersonnel(false) }}>
            <WorkIcon sx={{ fontSize: '2em' }} />
            Travail  
          </button>

          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(false); setViewTravail(false); setViewPersonnel(true) }}>
            <PersonIcon sx={{ fontSize: '2em' }} />
            Personnel  
          </button>

          <button onClick={ouvrirWhatsApp}>
            <WhatsAppIcon/> Nous contactez
          </button>
        </div>
        
       </div>
       <div className="sidebar1">
        {/* Ajouter un gestionnaire d'événements pour ouvrir le SettingsPanel */}
        <div className="btnsider1">

          {/* Bouton pour afficher le gestionnaire de tâches */}
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(true); setViewPersonnel(false); setViewTravail(false) }}>
            <CalendarMonthIcon sx={{ fontSize: '2em' }} />
            Gestion des tâches
          </button> 
          {/* Bouton pour afficher le formulaire d'ajout de tâche */}
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(false); setViewTravail(true); setViewPersonnel(false) }}>
            <WorkIcon sx={{ fontSize: '2em' }} />
            Travail
          </button>
          <button onClick={() => { setViewForm(false); setViewList(false); setViewManager(false); setViewTravail(false); setViewPersonnel(true) }}>
            <PersonIcon sx={{ fontSize: '2em' }} />
            Personnel
          </button>
          {/* Bouton pour afficher la liste des tâches */}
          <button onClick={() => { setViewForm(false); setViewList(true); setViewManager(false); setViewPersonnel(false); setViewTravail(false) }}>
            <WidgetsIcon sx={{ fontSize: '2em' }} />
            Liste de tâches
          </button>

          

          {/* <button onClick={ouvrirWhatsApp}>
            WhatsApp
          </button> */}
        </div>
        
       </div>
       

      {/* Contenu */}
      <div className="content"> 
        {viewForm && <AddTaskForm setViewForm={setViewForm} addTask={addTask} />}
        {viewList && <TaskList tasks={tasks} />}
        {viewManager && <TaskManager tasks={tasks} updateTask={updateTask} addTask={addTask} />}
        {viewTravail && <Travail tasks={tasks} updateTask={updateTask} addTask={addTask} />}
        {viewPersonnel && <Personnel tasks={tasks} updateTask={updateTask} addTask={addTask} />}

        
          <div className="btn-add">
            <button className="btn-add-anime" onClick={() =>  { setViewForm(true); setViewList(false); setViewManager(false); setViewPersonnel(false); setViewTravail(false) }} style={{ color: 'black', backgroundColor: 'gold', height: '3em', width: '6em', border: 'none', borderRadius: '5px', fontWeight: 'bold',marginRigth:'20px' }}>Ajouter</button>
            <button className="btn-add-anime1" onClick={() =>  { setViewForm(true); setViewList(false); setViewManager(false); setViewPersonnel(false); setViewTravail(false) }} style={{ color: 'black', backgroundColor: '#D5B15D',border: 'solid 2px black',justifyContent:'center',alignItem:'center'}}><AddCircleOutlineIcon sx={{ fontSize: '30px', fontWeight: '400'  }} /></button>
          </div>
        
        {viewSettings && (
          <SettingsPanel
            onDeleteLast={deleteLastTask}
            onDeleteAll={deleteAllTasks}
            onLogout={handleLogout}
            onClose={() => setViewSettings(false)}  // Fermer le panneau de réglages
          />
        )}
      </div> 
    </div>
  );
};

export default App;

     