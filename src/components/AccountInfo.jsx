import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { CgCloseO } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, updateUser } from '../features/user/userSlice';
import ErrorMessage from './ErrorMessage';

const AccountInfo = ({ data, status }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showNewPwConfirm, setShowNewPwConfirm] = useState(false);

  const { role: currAccountRole } = useSelector((state) => state.user.auth);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setValue('username', data, { shouldValidate: true });
  }, [data]);

  const onSubmitPassword = (formData) => {
    dispatch(updateUser(formData));
  };

  const delAccount = async () => {
    await dispatch(deleteUser(id));
    navigate('/nguoi-dung');
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const DeleteAccountConfirmation = () => {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Xóa tài khoản
            </AlertDialogHeader>

            <AlertDialogBody textAlign='center'>
              <CgCloseO
                className='mx-auto mb-4'
                fontSize='3rem'
                color='#DE3B33'
              />
              Bạn thật sự muốn xóa tài khoản này?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button colorScheme='red' onClick={delAccount} ml={3}>
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  return (
    <>
      {/* Thông tin tài khoản */}
      <Box as='form' onSubmit={handleSubmit(onSubmitPassword)}>
        <DeleteAccountConfirmation />

        <Flex justifyContent='space-between'>
          <h4 className='h4 mt-2'>Thông tin tài khoản</h4>
          <Button
            variant='ghost'
            disabled={status === 'inactive'}
            onClick={onOpen}
          >
            <FaTrash />
          </Button>
        </Flex>
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
                    validate: (val) => {
                      if (watch('newPassword') !== val) {
                        return 'Mật khẩu không trùng khớp';
                      }

                      return null;
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
