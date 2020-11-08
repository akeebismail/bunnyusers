import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SelectedUserContext = createContext();
export const SelectedUserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState('');

  return (
    <SelectedUserContext.Provider
      value={{ selectedUser, setSelectedUser }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
};

export const useSelectedUserValue = () => useContext(SelectedUserContext);

SelectedUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
