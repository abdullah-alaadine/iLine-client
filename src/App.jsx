import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

function App() {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginForm />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupForm />}
        />
        <Route path="*" element={<h1>404 Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
