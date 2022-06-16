import Dashboard from "./component/Dashboard";
// import { useUser } from "./contexts/UserContext";
import Login from "./component/Login";
import { useState } from "react";
import moment from "moment";
import { useUser } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useUser();

  return <>{user ? <Dashboard /> : <Login />}</>;
}

export default App;
