import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeEmail } from '../helpers';
import { useUsersValue } from '../context';

export const AddUser = ({ shouldShow = false }) => {
    const [show, setShow] = useState(shouldShow);
    const [name, setName] = useState('');

    const mEmail = makeEmail();
    const { users, setUsers } = useUsersValue();

    const addUser = () => {
        console.log(mEmail)
        const email = `${mEmail}@gmail.com`
        fetch('http://localhost:5000/users/create', {
            method: 'POST',
            body: JSON.stringify({name, email}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(res => {
            if (res.success) {
                setUsers(res.data)
                setName('')
                setShow(false)
            } else {
                console.log(res)
            }
        })
    }
    return (
        <div className="add-project" data-testid="add-project">
            {show && (
                <div className="add-project__input" data-testid="add-project-inner">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="add-project__name"
                        data-testid="project-name"
                        type="text"
                        placeholder="Enter username"
                    />
                    <button
                        className="add-project__submit"
                        type="button"
                        onClick={() => addUser()}
                        data-testid="add-project-submit"
                    >
                        Add User
                    </button>
                    <span
                        aria-label="Cancel adding project"
                        data-testid="hide-project-overlay"
                        className="add-project__cancel"
                        onClick={() => setShow(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setShow(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
            Cancel
          </span>
                </div>
            )}
            <span className="add-project__plus">+</span>
            <span
                aria-label="Add Project"
                data-testid="add-project-action"
                className="add-project__text"
                onClick={() => setShow(!show)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setShow(!show);
                }}
                role="button"
                tabIndex={0}
            >
        Add User
      </span>
        </div>
    );
};

AddUser.propTypes = {
    shouldShow: PropTypes.bool,
};
