import React, { useState } from 'react';
import {
    FaChevronDown,
    FaInbox,
    FaRegCalendarAlt,
    FaRegCalendar,
} from 'react-icons/fa';
import { Users } from '../Users';
import { useSelectedUserValue } from '../../context';
import { AddUser } from '../AddUser';

export const Sidebar = () => {
    const { setSelectedUser } = useSelectedUserValue();
    const [active, setActive] = useState('inbox');
    const [showUsers, setShowUsers] = useState(true);

    return (
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                <li
                    data-testid="inbox"
                    className={active === 'inbox' ? 'active' : undefined}
                >
                    <div
                        data-testid="inbox-action"
                        aria-label="Show inbox tasks"
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                            setActive('inbox');
                            setSelectedUser('INBOX');
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setActive('inbox');
                                setSelectedUser('INBOX');
                            }
                        }}
                    >
            <span>
              <FaInbox />
            </span>
                        <span>Inbox</span>
                    </div>
                </li>
                <li
                    data-testid="today"
                    className={active === 'today' ? 'active' : undefined}
                >
                    <div
                        data-testid="today-action"
                        aria-label="Show today's tasks"
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                            setActive('today');
                            setSelectedUser('TODAY');
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setActive('today');
                                setSelectedUser('TODAY');
                            }
                        }}
                    >
            <span>
              <FaRegCalendar />
            </span>
                        <span>Today</span>
                    </div>
                </li>
                <li
                    data-testid="next_7"
                    className={active === 'next_7' ? 'active' : undefined}
                >
                    <div
                        data-testid="next_7-action"
                        aria-label="Show tasks for the next 7 days"
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                            setActive('next_7');
                            setSelectedUser('NEXT_7');
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setActive('next_7');
                                setSelectedUser('NEXT_7');
                            }
                        }}
                    >
            <span>
              <FaRegCalendarAlt />
            </span>
                        <span>Next 7 days</span>
                    </div>
                </li>
            </ul>
            <div
                className="sidebar__middle"
                aria-label="Show/hide projects"
                onClick={() => setShowUsers(!showUsers)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setShowUsers(!showUsers);
                }}
                role="button"
                tabIndex={0}
            >
        <span>
          <FaChevronDown
              className={!showUsers ? 'hidden-projects' : undefined}
          />
        </span>
                <h2>Users</h2>
            </div>

            <ul className="sidebar__projects">{showUsers && <Users />}</ul>

            {showUsers && <AddUser />}
        </div>
    );
};
