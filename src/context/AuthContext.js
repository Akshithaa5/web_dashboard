import { createContext, useState } from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null); 

  const login = (user) => {
    setUsername(user); 
    localStorage.setItem('username', user); 
  };

  const logout = () => {
    console.log('Logging out...');
    setUsername(null); 
    localStorage.removeItem('email'); 
    localStorage.removeItem('password'); 
    localStorage.removeItem('username'); 
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
