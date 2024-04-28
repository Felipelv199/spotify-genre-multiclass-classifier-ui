import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedComponent from './components/auth/ProtectedComponent';
import Layout from './components/Layout/Layout';
import routes from './statics/routes/routes.json';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Tracks from './pages/Tracks';
import NotFound from './pages/NotFound';
import { store } from './state';

const App = () => {
  console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  console.log(process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path={routes.HOME} component={Home} />
              <Route exact path={routes.LOGIN} component={Login} />
              <ProtectedComponent
                exact
                path={routes.PROFILE}
                Component={Profile}
              />
              <ProtectedComponent
                exact
                path={routes.TRACKS}
                Component={Tracks}
              />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
