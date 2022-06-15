import Dashboard from "./component/Dashboard";
// import { useUser } from "./contexts/UserContext";
import Login from "./component/Login";
import { useState } from "react";
import moment from "moment";

function App() {
  // const [user, setUser] = useUser();
  const [user, setUser] = useState(true);

  return <>{user ? <Login /> : <Dashboard />}</>;
}

export default App;
