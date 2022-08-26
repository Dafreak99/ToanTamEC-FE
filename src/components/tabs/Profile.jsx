import { Box } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AccountInfo from '../AccountInfo';
import ProfileInfo from '../ProfileInfo';

const Profile = ({ self = false }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { username, fullName, phoneNumber, email, jobTitle, role } =
    useSelector((state) => (self ? state.user.auth : state.user.detail));

  const data = { username, fullName, phoneNumber, email, jobTitle, role };

  return (
    <Box>
      <AccountInfo data={data} />
      <ProfileInfo data={data} />
    </Box>
  );
};

export default Profile;
