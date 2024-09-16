import React, { useState, useEffect } from 'react';
import './styles/Auth.css';

function Auth({ onLoginSuccess, onLogout }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer la connexion

  // Vérifier si un utilisateur est connecté au montage du composant
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      console.log('Utilisateur connecté');
    } else {
      console.log('Redirection vers la page de connexion');
      setIsLoggedIn(false);
    }

    // Initialiser les utilisateurs dans localStorage si non présents
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify(savedUsers));
  }, []);

  // Gestion de l'inscription ou de la connexion selon l'état actuel
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  // Fonction d'inscription
  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = savedUsers.find(user => user.username === username);

    if (existingUser) {
      alert('Nom d\'utilisateur déjà pris');
      return;
    }

    const newUser = { username, password };
    const updatedUsers = [...savedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    setIsSignup(false);
  };

  // Fonction de connexion
  const handleLogin = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = savedUsers.find(user => user.username === username && user.password === password);

    if (user) {
      const token = 'YOUR_AUTH_TOKEN'; // Remplacer par le vrai token si nécessaire
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', username);
      setIsLoggedIn(true);
      onLoginSuccess(user); // Notifier le succès de la connexion
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    onLogout();
  };

  return (
    <div className="div">
      {isLoggedIn ? (
        <div>
          <h2>Bienvenue, {localStorage.getItem('currentUser')} !</h2>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <div className="auth">
          <h1>{isSignup ? 'Inscription' : 'Connexion'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nom d'utilisateur:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Mot de passe:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignup && (
              <div className="input-group">
                <label>Confirmer le mot de passe:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button className="boutonauth1" type="submit">
              {isSignup ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </form>
          <div className="boton">
            <button className="boutonauth2" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Déjà inscrit ? Connectez-vous' : 'Pas encore de compte ? Inscrivez-vous'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
