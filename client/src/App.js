import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "./components/Layout";
import { User } from "./components";
import Routes from "./Routes";
import { AuthService } from "./services";

const App = () => {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const authUser = await AuthService.getCurrentUser();
          setUser(authUser.data.data.currentUser);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Router>
        <CssBaseline />
        <Header>{user && <User user={user} onLogout={onLogout} />}</Header>
        <Routes user={user} />
      </Router>
    </div>
  );
};

export default App;
