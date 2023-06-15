import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthenticationContext } from '../authentication';

const Dashboard = () => {
  const { currentUser } = useContext(AuthenticationContext);
  
  if (!currentUser) {
    return <Navigate to='/user/access/signin' />;
  }

  const handleSignout = async (e) => {
    e.preventDefault();
    await Auth.signOut();
  };
  
  return (
    <div className='container mt-5'>
      <h1>Welcome</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
      <button onClick={ handleSignout } className='btn btn-danger'>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
