import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from '../components/GlobalStyles';
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import Dashboard from '../dashboard/Dashboard';
import { AuthContextProvider } from '../auth/context';
import PrivateRoute from '../auth/PrivateRoute';
import ViewAdvert from '../adverts/ViewAdvert';
import NewAdvert from '../adverts/NewAdvert';
import './App.css';

/**
 * FALTA RECUPERAR AL USUARIO SI YA ESTA LOGUEADO EN EL LOCAL STORAGE
 */

function App({ userInitiallyLogged }) {
  const [userLogged, setUserLogged] = useState(userInitiallyLogged);

  const handleLogin = userLogged =>
    new Promise(resolve => {
      setUserLogged(userLogged);
      resolve();
    });

  const handleLogout = () => setUserLogged(false);

  return (
    <AuthContextProvider
      value={{
        isLogged: !!userLogged,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact>
            {userLogged ? (
              <Redirect to="/adverts"></Redirect>
            ) : (
              ({ history }) => (
                <LoginPage history={history} onLogin={handleLogin} />
              )
            )}
          </Route>
          <PrivateRoute path="/adverts" exact component={Dashboard} />
          <PrivateRoute path="/advert/:advertId" exact component={ViewAdvert} />
          <PrivateRoute path="/newadvert" exact component={NewAdvert} />
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
