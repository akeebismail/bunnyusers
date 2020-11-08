import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedUserValue, useUsersValue } from '../context';

export const Tasks = () => {
  const { selectedUser } = useSelectedUserValue();
  const { users } = useUsersValue();
  const { tasks } = useTasks(selectedUser);
  let username = '';
  if (collatedTasksExist(selectedUser) && selectedUser) {
    let user = getCollatedTitle(collatedTasks, selectedUser).name;
    if (user) {
      username = user.name
    } else {
      username = 'Inbox'
    }
  }

  if (
    users &&
    users.length > 0 &&
    selectedUser &&
    !collatedTasksExist(selectedUser)
  ) {
    let getT = getTitle(users, selectedUser);
    //console.log('getT', getT.name)
    if (getT) {
      username = getT.name
    } else {
      username = 'Inbox'
    }
    //username = 'GETT'
  }

  useEffect(() => {
    document.title = `${username}: Tasks`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{username}</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task._id} taskDesc={task.description} />
            <span>{task.name}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};
