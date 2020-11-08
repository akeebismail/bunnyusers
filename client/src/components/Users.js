import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelectedUserValue, useUsersValue } from '../context';
import { IndividualTask } from './IndividualTask';

export const Users = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedUser } = useSelectedUserValue();
  const { users } = useUsersValue();


  return (
    users &&
    users.map((user) => (
      <li
        key={user._id}
        data-testid="project-action-parent"
        data-doc-id={user._id}
        className={
          active === user._id
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${user.name} as the task`}
          onClick={() => {
            setActive(user._id);
            setSelectedUser(user._id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(user._id);
              setSelectedUser(user._id);
            }
          }}
        >
          <IndividualTask user={user} />
        </div>
      </li>
    ))
  );
};

Users.propTypes = {
  activeValue: PropTypes.bool,
};
