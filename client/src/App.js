import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import {SelectedUserProvider, UsersProvider } from './context';

const App = ({ darkModeDefault = false }) => {
    const [darkMode, setDarkMode] = useState(darkModeDefault);

    return (
        <SelectedUserProvider>
            <UsersProvider>
                <main
                    data-testid="application"
                    className={darkMode ? 'darkmode' : undefined}
                >
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Content />
                </main>
            </UsersProvider>
        </SelectedUserProvider>
    );
};

App.propTypes = {
    darkModeDefault: PropTypes.bool,
};

export default App;