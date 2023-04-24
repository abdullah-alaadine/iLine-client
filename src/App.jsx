import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

function App() {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className="scroll bg-slate-400 w-full flex flex-col gap-5">
      <div className="relative w-full bg-slate-100 h-screen border-2 mx-auto">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
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
      </div>
    </div>
  );
}

export default App;
