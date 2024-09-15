import React, { useState } from 'react';
import { Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import Parrametre from './parrametre';
import './styles/Sidebar.css'; // Importer le fichier CSS

function ouvrirWhatsApp() { 
    var numero = '+241077679339';
    var message = 'je voudrais vous demander si ';
    var url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(message);

    // Redirection automatique
    window.location.href = url;
}

const Sidebar = ({ setViewForm, setViewList, setViewManager, setViewTravail, setViewPersonnel, setViewSettings }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Bouton de menu pour les écrans plus petits */}
      <Button className="menu-toggle" onClick={toggleDrawer}>
        <MenuIcon />
      </Button>
      <Drawer className={`${open ? 'open' : ''}`} open={open} onClose={toggleDrawer}>
        <Parrametre className="parrametre" onClick={() => setViewSettings(true)} />

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
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
