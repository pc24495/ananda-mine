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
import Update from "./Components/Updates/Update.jsx";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //Change back to false after testing (changeback***)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  const userString = localStorage.getItem("user");

  const user = JSON.parse(userString);

  if (!isAuthenticated) {
    // Redirect if not authenticated
    return <Navigate to="/" replace />;
  } else if (!user.name) {
    return <Navigate to="/create-account/name" />;
  } else if (!user.birthday) {
    console.log("no birthday");
    return <Navigate to="/create-account/birthday" />;
  } else if (!user.pic1Url || user.pic1Url === "") {
    console.log("no pic1Url");
    return <Navigate to="/create-account/pics" />;
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
