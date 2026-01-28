import React, { useState, useEffect } from 'react';
import Lanyard from '../components/Lanyard';
import '../components/Lanyard.css';

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the 'c' parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const userCode = urlParams.get('c');

    if (!userCode) {
      setError('Falta código QR');
      setLoading(false);
      return;
    }

    // Fetch users.json
    fetch('/users.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load users.json');
        }
        return response.json();
      })
      .then(users => {
        // Find user where id matches the code
        const foundUser = users.find(u => String(u.id) === String(userCode));
        
        if (!foundUser) {
          setError('QR inválido');
        } else {
          setUser(foundUser);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading users:', err);
        setError('Error cargando base de datos');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="lanyard-loading">
        <h1>Cargando...</h1>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lanyard-error">
        <h1>{error}</h1>
        <p>Por favor verifica tu código QR</p>
      </div>
    );
  }

  if (user) {
    return <Lanyard nombre={user.nombre} telefono={user.telefono} />;
  }

  return null;
}
