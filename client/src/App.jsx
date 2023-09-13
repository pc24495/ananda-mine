import "./App.css";
import PropTypes from "prop-types";
// import Layout from "./Components/Layout/Layout";
import AppLayout from "./Components/AppLayout/AppLayout";
import Login from "./Components/LoginPage/Login.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import Recs from "./Components/Recs/Recs.jsx";
import { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store.js";
import { useSelector } from "react-redux";
import Update from "./Components/Updates/Update.jsx";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //Change back to false after testing (changeback***)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("Testinggggg");
  // Authentication logic entirely here
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const name = localStorage.getItem("name");
  console.log("Testingggggggggggg");
  console.log(name);
  // const birthday = useSelector(state => state.)

  if (!isAuthenticated) {
    // Redirect if not authenticated
    return <Navigate to="/" replace />;
  } else if (!name) {
    console.log("Redirecting to name");
    return <Navigate to="/create-account/name" />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="recs" element={<Recs />} />
        <Route path="chat/*" element={<Chat />} />
        <Route index element={<Chat />} />
      </Routes>
    </AppLayout>
  );
};

const LoginRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    // Redirect if not authenticated
    return <Navigate to="/app/recs" replace />;
  }

  return children;
};

const AppInner = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginRoute>
                <Login></Login>
              </LoginRoute>
            }
          />
          <Route path="/app/*" element={<ProtectedRoute />}></Route>
          <Route path="create-account/*" element={<Update />}></Route>
        </Routes>
      </Router>
    </>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

LoginRoute.propTypes = {
  children: PropTypes.element,
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <AppInner></AppInner>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default App;
