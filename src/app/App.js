import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from '../components/GlobalStyles';
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import Dashboard from '../dashboard/Dashboard';
import { AuthContextProvider } from '../auth/context';
import PrivateRoute from '../auth/PrivateRoute';

import './App.css';

/**
 * FALTA RECUPERAR AL USUARIO SI YA ESTA LOGUEADO EN EL LOCAL STORAGE
 */

function App() {
  const [loggedUserId, setloggedUserId] = useState('');

  const handleLogin = (loggedUserId) =>
    new Promise((resolve) => {
      setloggedUserId(loggedUserId);
      resolve();
    });

  return (
    <AuthContextProvider
      value={{
        isLogged: !!loggedUserId,
        onLogin: handleLogin,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact>
            {({ history }) => (
              <LoginPage history={history} onLogin={handleLogin} />
            )}
          </Route>
          <PrivateRoute path="/dashboard" exact>
            <Dashboard />
          </PrivateRoute>
          <Route path="/404" exact>
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              404 | Not found page
            </div>
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;