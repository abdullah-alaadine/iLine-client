import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignupForm from "./components/SignupForm"
import LoginForm from "./components/LoginForm"

function App() {

  return (
    <div className="scroll bg-slate-400 h-[110vh] w-full flex flex-col gap-5">
      <div></div>
      <div className="relative w-full md:w-11/12 bg-slate-100 h-screen md:h-[82%] border-2 mx-auto rounded-2xl">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>jello</h1>} /> 
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path="*" element={<h1>404 Not Found!</h1>}/> 
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default App
