import iLineLogo from '../assets/iLine_logo-removebg-preview.png'
import {Link} from 'react-router-dom'

const LoginForm = () => {
  return (
    
    <div className="flex flex-col md:flex-row justify-around items-center h-screen gap-x-4 bg-slate-200 rounded-2xl shadow-lg">
      <div className=' w-2/5 h-auto min-w-[200px] bg-slate-400 rounded-md shadow-md'>
        <img src={iLineLogo} className="p-2" />
      </div>
      <div className="bg-slate-400 rounded-lg p-6 shadow-md">
        <form className="flex flex-col gap-3">
            <h1 className='text-center text-2xl text-slate-800'>Login</h1>
            <p className='text-center text-slate-700 text-md'> Don't have an account? <Link className=' underline' to='/signup'>Sign Up</Link></p>
          <input type="email" placeholder="Email" className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
