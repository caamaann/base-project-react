import { Route, Switch } from "react-router-dom";

// styles
import './assets/styles/styles.scss';
import "bootstrap/dist/css/bootstrap.min.css";

// views
import Index from './views/Index';

const App = () => {
  return (
    <Switch>
      <Route 
        path="/"
        exact
        component={Index}
      />
    </Switch>
  );
}

export default App;
