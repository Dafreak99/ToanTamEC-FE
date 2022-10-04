import { Box, Button, FormLabel, Input, Select } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import { updateUser } from '../features/user/userSlice';

const ProfileInfo = ({ data }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { role: currAccountRole } = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();

  const onSubmitProfile = (formData) => {
    dispatch(updateUser(formData));
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <>
      {/* Thông tin cá nhân */}
      <Box as='form' onSubmit={handleSubmit(onSubmitProfile)}>
        <h4 className='h4 mt-6'>Thông tin cá nhân</h4>
        <hr className='mb-6' />
        <div>
          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='fullName'>Họ và tên:</FormLabel>
            </div>
            <div className='col col-span-3'>
              <Input
                id='fullName'
                name='fullName'
                type='text'
                placeholder='Họ và tên'
                {...register('fullName', { required: true })}
              />
              {errors?.fullName && <ErrorMessage />}
            </div>
          </div>
          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='phoneNumber'>Số điện thoại:</FormLabel>
              {/* TODO: Copy the existing phone validatiob */}
              {/* TODO: Aware of edge cases */}
            </div>
            <div className='col col-span-3'>
              <Input id='phoneNumber' placeholder='Số điện thoại' />
              {errors?.phoneNumber && <ErrorMessage />}
            </div>
          </div>
          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='email'>Email:</FormLabel>
            </div>
            <div className='col col-span-3'>
              <Input id='email' type='text' placeholder='Email' />
              {errors?.email && <ErrorMessage />}
            </div>
          </div>
          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='jobTitle'>Chức vụ:</FormLabel>
            </div>
            <div className='col col-span-3'>
              <Input
                id='jobTitle'
                type='text'
                placeholder='Chức vụ'
                {...register('jobTitle', { required: true })}
              />
              {errors?.jobTitle && <ErrorMessage />}
            </div>
          </div>
          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='role'>Quyền hạn tài khoản:</FormLabel>
            </div>
            <div className='col col-span-3'>
              <Controller
                name='role'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select {...field} disabled={currAccountRole === 3}>
                    <option value={1}>Admin</option>
                    <option value={2}>Quản lý</option>
                    <option value={3}>Nhân viên</option>
                  </Select>
                )}
              />
              {errors?.role && <ErrorMessage />}
            </div>
          </div>

          <div className='flex justify-end items-center mt-10'>
            <Button variant='primary' type='submit'>
              Cập nhật
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProfileInfo;
