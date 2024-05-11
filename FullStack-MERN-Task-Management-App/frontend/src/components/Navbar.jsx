import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-gray-800 shadow-sm items-center'>
        <h2 className='cursor-pointer uppercase font-bold text-white'>
          <Link to="/" className="text-white"> Task Management App </Link>
        </h2>
        <ul className='hidden md:flex gap-4 uppercase font-bold'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-yellow-400 text-black hover:bg-blue-600 font-semibold rounded-md">
                <Link to='/tasks/add' className='block w-full h-full px-4 py-2'> <i className="fa-solid fa-plus"></i> Add task </Link>
              </li>
              <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm text-white' onClick={handleLogoutClick}>Logout</li>
            </>
          ) : (
            <li className='py-2 px-3 cursor-pointer text-white hover:bg-gray-100 transition rounded-sm'><Link to="/login" className="text-white">Login</Link></li>
          )}
        </ul>
        <span className='md:hidden cursor-pointer text-white' onClick={toggleNavbar}><i className="fa-solid fa-bars"></i></span>


        {/* Navbar displayed as sidebar on smaller screens */}
        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition ${(isNavbarOpen === true) ? 'translate-x-0' : 'translate-x-full'} bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}>
          <div className='flex'>
            <span className='m-4 ml-auto cursor-pointer text-white' onClick={toggleNavbar}><i className="fa-solid fa-xmark"></i></span>
          </div>
          <ul className='flex flex-col gap-4 uppercase font-semibold text-center'>
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-400 text-white hover:bg-blue-600 font-semibold transition py-2 px-3">
                  <Link to='/tasks/add' className='block w-full h-full'> <i className="fa-solid fa-plus"></i> Add task </Link>
                </li>
                <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm text-white' onClick={handleLogoutClick}>Logout</li>
              </>
            ) : (
              <li className='py-2 px-3 cursor-pointer text-white hover:bg-gray-200 transition rounded-sm'><Link to="/login" className="text-white">Login</Link></li>
            )}
          </ul>
        </div>
      </header>
    </>
  )
}

export default Navbar
