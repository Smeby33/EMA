import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './styles/Parrametre.css';

function Parrametre({onClick}) {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      setUsername(currentUser);

      // Récupérer l'image et les autres données spécifiques à l'utilisateur
      const storedImage = localStorage.getItem(`imageURL_${currentUser}`);
      if (storedImage) {
        setImage(storedImage);
      }
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImage(imageDataUrl);
        localStorage.setItem(`imageURL_${username}`, imageDataUrl);  // Stocker l'image pour l'utilisateur actuel
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="Parametre-contenue" style={{ border: 'none', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}  >
      <div className="parcontenu">
        <div className="insertImage" onClick={handleDivClick} style={{ backgroundColor: 'black', cursor: 'pointer', border: 'none', borderRadius: '50px', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {image ? (
            <img src={image} alt="Image de profil" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50px' }} />
          ) : (
            <span style={{ fontSize: '12px', color: 'gold', textAlign: 'center' }}>Cliquer pour insérer une image</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />

        <div className="utilisateur"  onClick={onClick} style={{ marginLeft: '5px' }}>
          <h4 style={{ textAlign: 'center' }}>
            {username}  {/* Affiche le nom d'utilisateur ici */}
            <KeyboardArrowDownIcon  sx={{ marginLeft: '10px' }} />
          </h4>
          <span className="hugeicons--tablet-pen"></span>
        </div>
      </div>
      <div className="parcontenu1">
        
        <div className="insertImage" onClick={handleDivClick} style={{ backgroundColor: 'black', cursor: 'pointer', border: 'none', borderRadius: '50px', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {image ? (
            <img src={image} alt="Image de profil" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50px' }} />
          ) : (
            <span style={{ fontSize: '12px', color: 'gold', textAlign: 'center' }}>Cliquer pour insérer une image</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      <div className="utilisateur"  onClick={onClick} style={{ marginLeft: '5px' }}>
          <span className="hugeicons--tablet-pen"></span>
      </div>
      
    </div>
  );
}

export default Parrametre;
