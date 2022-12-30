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
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>

            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password">
              <ResetPasswordPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default App;
