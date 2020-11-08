import React from 'react';
import PropTypes from 'prop-types';
import { useUsersValue } from '../context';

export const UserOverlay = ({
  setUser,
  showUserOverlay,
  setShowUserOverlay,
}) => {
  const { users } = useUsersValue();

  return (
    users &&
    showUserOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {users.map((user) => (
            <li key={user._id}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setUser(user._id);
                  setShowUserOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setUser(user._id);
                    setShowUserOverlay(false);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the user tasks"
              >
                {user.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

UserOverlay.propTypes = {
  users: PropTypes.array,
};
