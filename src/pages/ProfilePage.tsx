import React from 'react';

const ProfilePage = ({ user }) => {
  return (
    <div>
      <h1>{user.name}'s Profile Page</h1>
    </div>
  );
};

export default ProfilePage;