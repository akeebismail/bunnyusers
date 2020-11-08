/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { collatedTasksExist } from '../helpers';

export const useTasks = selectedUser => {

  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/tasks/${selectedUser}/user`).then(response => response.json()).then(res => {
      setTasks(res.data)
    })
    return () => {};
  }, [selectedUser]);

  return { tasks, archivedTasks };
};

export const useUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/use').then(response => response.json())
        .then(res => {

          if (res.success) {
            setUsers(res.data)
          }
    }).catch(e => {
      console.log('error fetching users', e)
      setUsers([])
    })
  }, [users]);

  return { users, setUsers };
};
