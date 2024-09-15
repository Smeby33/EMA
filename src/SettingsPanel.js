import React,{ useState,useEffect } from 'react';
import './styles/SettingsPanel.css'; // Assure-toi de créer le fichier CSS pour le style


function SettingsPanel({ onDeleteLast, onDeleteAll, onLogout, onClose }) {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
  
    if (currentUser) {
      setUsername(currentUser);
  
    }
  }, []);
    
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h3>Paramètres</h3>

        
        {/* Bouton pour fermer le panneau de paramètres */}
        <button onClick={onClose} className="close-button">X</button>
      </div>

      <div className="settings-content">
      <div className="utilisateur" style={{ marginLeft: '5px' }}>
          <h3 style={{ textAlign: 'center' }}>
            {username}  {/* Affiche le nom d'utilisateur ici */}
          </h3   >
          <span className="hugeicons--tablet-pen"></span>
        </div>
        {/* Option pour supprimer la dernière tâche */}
        <div className="settings-item">
          <button onClick={onDeleteLast} className="settings-button">Supprimer la dernière tâche</button>
        </div>

        {/* Option pour supprimer toutes les tâches */}
        <div className="settings-item">
          <button onClick={onDeleteAll} className="settings-button">Supprimer toutes les tâches</button>
        </div>

        {/* Option pour déconnecter l'utilisateur */}
        <div className="settings-item">
          <button onClick={onLogout} className="settings-button logout-button">Déconnexion</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
