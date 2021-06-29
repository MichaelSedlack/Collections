import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Switch> {/* Switch: Wraps multiple Route components. Only picks the first matching route among all the routes */}
        <Route path="/register" exact> {/* Only if the path is an exact match will it call the RegisterPage. Example: http://localhost:3000/register */}
          <RegisterPage />
        </Route>
        <Route path="/" exact>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
