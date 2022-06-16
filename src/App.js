import Dashboard from "./component/Dashboard";
import Login from "./component/Login";

import { useUser } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useUser();

  return <>{user ? <Dashboard /> : <Login />}</>;
}

export default App;
