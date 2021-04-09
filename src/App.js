import { Route, Switch } from "react-router-dom";

// styles
import "./assets/styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// views
import Index from "./views/Index";
import Login from "./views/login";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
    </Switch>
  );
};

export default App;
