import './App.css';
import {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MuseumPage from './pages/MuseumPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CollectionsPage from './pages/CollectionsPage';
import { UserContext, RoomContext } from './components/UserContext';

function App() {

  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <RoomContext.Provider value={{room, setRoom}}>
      <Layout>
        <Router>
          <Switch> {/* Switch: Wraps multiple Route components. Only picks the first matching route among all the routes */}
            <Route path="/register" exact> {/* Only if the path is an exact match will it call the RegisterPage. Example: http://localhost:3000/register */}
              <RegisterPage />
            </Route>
            <Route path="/" exact>
              <LoginPage />
            </Route>
            <Route path="/museum">
              {!user ? <Redirect to='/'/> : <MuseumPage />}
            </Route>
            <Route path="/forgotpassword" exact>
              <ForgotPasswordPage />
            </Route>
            <Route path='/collections'>
              {!user ? <Redirect to='/'/> : <CollectionsPage/>}
            </Route>
            <Route path='/reset/:id'>
              <ResetPasswordPage />
            </Route>
            
          </Switch>
        </Router>
      </Layout>
      </RoomContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
