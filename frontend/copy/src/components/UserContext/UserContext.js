import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const setUserDetailsValue = (details) => {
    setUserDetails(details);
  };

  return (
    <UserContext.Provider value={{ userDetails, setUserDetailsValue }}>
      {children}
    </UserContext.Provider>
  );
};
