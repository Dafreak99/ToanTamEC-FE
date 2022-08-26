import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ErrorMessage from '../utils/ErrorMessage';

const AccountInfo = ({ data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showNewPwConfirm, setShowNewPwConfirm] = useState(false);

  const { role: currAccountRole } = useSelector((state) => state.user.auth);

  const onSubmitPassword = (data) => {
    console.log(data);
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <>
      {/* Thông tin tài khoản */}
      <Box as='form' onSubmit={handleSubmit(onSubmitPassword)}>
        <h4 className='h4 mt-2'>Thông tin tài khoản</h4>
        <hr className='mb-6' />
        <div>
          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='userName'>Tên người dùng:</FormLabel>
            </div>
            <div className='col col-span-3'>
              <Input
                id='text'
                type='text'
                placeholder='Tên người dùng'
                {...register('username', { required: true })}
                contentEditable
              />
              {errors?.username && <ErrorMessage />}
            </div>
          </div>
          {currAccountRole === 3 && (
            <div className='grid grid-cols-12 mt-4'>
              <>
                <div className='col col-span-3'>
                  <FormLabel htmlFor='oldPassword'>Mật khẩu cũ:</FormLabel>
                </div>
                <div className='col col-span-3'>
                  <InputGroup size='md'>
                    <Input
                      id='oldPassword'
                      {...register('oldPassword', { required: true })}
                      placeholder='Nhập mật khẩu hiện tại'
                      type={showOldPw ? 'text' : 'password'}
                    />
                    <InputRightElement width='4.5rem'>
                      <Box
                        as='span'
                        cursor='pointer'
                        marginLeft='2rem'
                        fontSize='1.2rem'
                        color='gray.400'
                        onClick={() => setShowOldPw(!showOldPw)}
                      >
                        {showOldPw ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                  {errors?.oldPassword && <ErrorMessage />}
                </div>
              </>
            </div>
          )}

          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='newPassword'>Mật khẩu mới:</FormLabel>
            </div>
            <div className='col col-span-3'>
              <InputGroup size='md'>
                <Input
                  id='newPassword'
                  type={showNewPw ? 'text' : 'password'}
                  placeholder='Mật khẩu mới'
                  {...register('newPassword', {
                    required: {
                      value: true,
                      message: 'Vui lòng điền trường này!',
                    },
                    minLength: {
                      value: 12,
                      message: 'Mật khẩu dài 12-255 ký tự',
                    },
                    maxLength: {
                      value: 255,
                      message: 'Mật khẩu dài 12-255 ký tự',
                    },
                  })}
                />
                <InputRightElement width='4.5rem'>
                  <Box
                    as='span'
                    cursor='pointer'
                    marginLeft='2rem'
                    fontSize='1.2rem'
                    color='gray.400'
                    onClick={() => setShowNewPw(!showNewPw)}
                  >
                    {showNewPw ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Box>
                </InputRightElement>
              </InputGroup>
              {errors?.newPassword && (
                <ErrorMessage msg={errors.newPassword.message} />
              )}
            </div>
          </div>
          <div className='grid grid-cols-12 mt-4'>
            <div className='col col-span-3'>
              <FormLabel htmlFor='confirmNewPassword'>
                Nhập lại mật khẩu:
              </FormLabel>
            </div>
            <div className='col col-span-3'>
              <InputGroup size='md'>
                <Input
                  id='confirmNewPassword'
                  type={showNewPwConfirm ? 'text' : 'password'}
                  placeholder='Mật khẩu mới'
                  {...register('confirmNewPassword', {
                    required: {
                      value: true,
                      message: 'Vui lòng điền trường này!',
                    },
                    minLength: {
                      value: 12,
                      message: 'Mật khẩu dài 12-255 ký tự',
                    },
                    maxLength: {
                      value: 255,
                      message: 'Mật khẩu dài 12-255 ký tự',
                    },
                  })}
                />
                <InputRightElement width='4.5rem'>
                  <Box
                    as='span'
                    cursor='pointer'
                    marginLeft='2rem'
                    fontSize='1.2rem'
                    color='gray.400'
                    onClick={() => setShowNewPwConfirm(!showNewPwConfirm)}
                  >
                    {showNewPwConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Box>
                </InputRightElement>
              </InputGroup>
              {errors?.confirmNewPassword && (
                <ErrorMessage msg={errors.confirmNewPassword.message} />
              )}
            </div>
          </div>
          <div className='flex justify-end items-center'>
            <Button variant='primary' type='submit'>
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default AccountInfo;
