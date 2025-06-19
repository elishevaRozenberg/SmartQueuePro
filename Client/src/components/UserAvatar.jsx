import React from 'react';

const UserAvatar = ({ fullName, imageUrl, size = 40 }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    return parts.map(p => p[0]).join('').toUpperCase();
  };

  const avatarSize = `${size}px`;

  return (
    <div
      className="rounded-full bg-blue-500 text-white flex items-center justify-center overflow-hidden"
      style={{ width: avatarSize, height: avatarSize }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" className="object-cover w-full h-full" />
      ) : (
        <span className="font-bold" style={{ fontSize: size / 2 }}>{getInitials(fullName)}</span>
      )}
    </div>
  );
};

export default UserAvatar;