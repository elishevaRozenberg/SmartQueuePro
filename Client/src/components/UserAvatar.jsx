// src/components/UserAvatar.jsx
import React from 'react';

const UserAvatar = ({ fullName }) => {
  if (!fullName) return null;
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold">
      {initials}
    </div>
  );
};

export default UserAvatar;
