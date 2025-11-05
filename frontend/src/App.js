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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Leave Management System</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">{user.name}</span>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {user.role}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {user.role === 'admin' ? (
          <AdminDashboard token={token} />
        ) : (
          <EmployeeDashboard token={token} user={user} />
        )}
      </div>
    </div>
  );
};