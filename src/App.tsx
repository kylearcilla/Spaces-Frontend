import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./utils/App/ProtectedRoute";

function App() {
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <div className="App">
            <ProtectedRoute exact path="/" type="landing" />
            <ProtectedRoute path="/home" type="home" />
            <ProtectedRoute path="/home/spotify" type="spotify" />
          </div>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
