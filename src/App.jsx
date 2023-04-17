import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { useSelector } from "react-redux";

function App() {
  const { authData } = useSelector((state) => state.authReducer);
  const user = authData?.user;

  return (
    <div className="scroll bg-slate-400 h-[110vh] w-full flex flex-col gap-5">
      <div></div>
      <div className="relative w-full md:w-11/12 bg-slate-100 h-screen md:h-[82%] border-2 mx-auto rounded-2xl">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <h1>helli</h1> : <Navigate to="/login" />}
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
