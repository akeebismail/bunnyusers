import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useUsersValue, useSelectedUserValue } from '../context';
import config from '../config'
export const IndividualTask = ({ user }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { users, setUsers } = useUsersValue();
  const { setSelectedUser } = useSelectedUserValue();
  const deleteProject = (id) => {
    console.log('delete...', id)
      fetch(`${config}/users/${id}`, {
          method: 'DELETE',

      }).then(response => response.json()).then(res => {
          console.log(res)
          if (res.success){
              setUsers(res.data)
              setSelectedUser('INBOX')
          }
      })
      //setUsers(...users)
      //setSelectedUser(user._id)
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{user.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of user"
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="">
            <div className="">
              <p>Are you sure you want to delete this user?</p>
              <button
                type="button"
                onClick={() => deleteProject(user._id)}
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding tasks, do not delete"
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

IndividualTask.propTypes = {
  user: PropTypes.object.isRequired,
};
