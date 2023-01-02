import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage";

const App = () => {
  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <main className={styles.main}>
        <Router>
          <React.StrictMode>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPasswordPage}
              />
              <Route
                exact
                path="/reset-password"
                component={ResetPasswordPage}
              />
              <Route exact path="/" component={HomePage} />
            </Switch>
          </React.StrictMode>
        </Router>
      </main>
    </div>
  );
};

export default App;
