import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import AccountInfo from '../AccountInfo';
import ProfileInfo from '../ProfileInfo';

const Profile = ({ self = false }) => {
  const { username, fullName, phoneNumber, email, jobTitle, role } =
    useSelector((state) => (self ? state.user.auth : state.user.detail));

  return (
    <Box>
      <AccountInfo data={username} />
      <ProfileInfo
        data={{ username, fullName, phoneNumber, email, jobTitle, role }}
      />
    </Box>
  );
};

export default Profile;
