import { RootState } from '@/state/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
    const {token} = useSelector((state: RootState) => state.states.user.value)

    
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Válassz ki egy fájlt!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('https://mateszadam.koyeb.app/images', {
        method: 'POST',
        headers: {
          'Accept-Language': 'hu',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Hiba a feltöltés során');

      const result = await response.json();
      setMessage('Sikeres feltöltés!');
      setError('');
      console.log(result);
    } catch (err) {
        console.log(err)
      setError("hulye");
      setMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <button type="submit">Feltöltés</button>
      </form>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
