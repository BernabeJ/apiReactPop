
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import AdvertsPage from './components/anuncios/AdvertsPage';
import AdvertPage from './components/anuncios/AdvertPage/AdvertPage';
import NewAdvertsPage from './components/anuncios/NewAdvertsPage/NewAdvertsPage';
import {LoginPage, PrivateRoute} from './components/auth'
import { useState } from 'react';
import { logout } from './components/auth/service';
import { AuthContextProvider } from './components/auth/context';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true)
  };  

  const handleLogout = () => {
    logout().then(()=> setIsLogged(false));
  }

  
 

  return (
    <Router>
    <AuthContextProvider value={{isLogged, handleLogout, handleLogin}}>
        <div className='App'>
          <Switch>
            <Route
              path="/login">
             {routeProps => <LoginPage {...routeProps}/>}
              </Route>
            <PrivateRoute path="/adverts/new" component={NewAdvertsPage} />
            <PrivateRoute path="/adverts/:id" component={AdvertPage}/>
            <PrivateRoute path="/adverts" component={AdvertsPage} />
            <PrivateRoute exact path="/">
              <Redirect to="/adverts" />
            </PrivateRoute>
            <Route path="/404">
              <div> 404 | Not Found Page</div>
            </Route>
            <Route>
              <Redirect to="404" />
            </Route>

          </Switch>
          
          
        </div>
    </AuthContextProvider>

    </Router>
  );
}

export default App;
