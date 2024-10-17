import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around parts of the app that need authentication
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  // On component mount, check if user is already logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Login function to store user details in local storage
  const login = (user) => {
    setUsername(user); 
    localStorage.setItem('username', user); // Store username in localStorage
  };

  // Logout function to clear user data from local storage
  const logout = () => {
    console.log('Logging out...');
    setUsername(null); // Clear username state
    localStorage.removeItem('email'); 
    localStorage.removeItem('password'); 
    localStorage.removeItem('username'); // Remove user info from localStorage
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
