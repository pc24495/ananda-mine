import "./App.css";
import PropTypes from "prop-types";
// import Layout from "./Components/Layout/Layout";
import AppLayout from "./Components/AppLayout/AppLayout";
import Login from "./Components/LoginPage/Login.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import Recs from "./Components/Recs/Recs.jsx";
import { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirect if not authenticated
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="recs" element={<Recs />} />
        <Route path="chat" element={<Chat />} />
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
    <AuthProvider>
      <AppInner></AppInner>
    </AuthProvider>
  );
};

export default App;
