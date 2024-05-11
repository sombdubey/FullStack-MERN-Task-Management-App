import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${authState.user.name}'s Tasks` : "Task Manager";
  }, [authState]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full">
        {!isLoggedIn ? (
          <div className='bg-blue-600 text-white py-12 px-4 rounded-lg text-center'>
            <h1 className='text-4xl font-bold mb-6'>Welcome to Task Manager App</h1>
            <Link to="/signup" className='text-xl inline-block py-2 px-6 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition duration-300'>Click here to manage your tasks <i className="fas fa-arrow-right ml-2"></i></Link>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold mb-8'>Welcome {authState.user.name}</h1>
            <Tasks />
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Home;

