import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useUsers } from '../hooks';

export const UsersContext = createContext();
export const UsersProvider = ({ children }) => {
  const { users, setUsers } = useUsers();

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersValue = () => useContext(UsersContext);

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
