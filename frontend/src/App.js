import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, LogOut, Calendar, User } from 'lucide-react';

const API_URL = 'http://localhost:5000';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    // Check if user is logged in
    if (token && user) {
      console.log('User logged in:', user);
    }
  }, [token, user]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  if (!token || !user) {
    return <AuthPages setToken={setToken} setUser={setUser} />;
  }
