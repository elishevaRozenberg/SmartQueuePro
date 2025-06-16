import React, { useContext } from 'react';
import UserAvatar from './UserAvatar';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-xl font-bold">MyGym</div>
      <div className="flex items-center space-x-4">
        {user && <UserAvatar fullName={user.full_name} />}
      </div>
    </nav>
  );
};

export default NavBar;
