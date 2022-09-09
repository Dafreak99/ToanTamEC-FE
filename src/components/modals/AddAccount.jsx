import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUsers } from '../../features/user/userSlice';
import Datepicker from '../../partials/actions/Datepicker';
import ErrorMessage from '../../utils/ErrorMessage';
/**
 *
 * @children Pass in the button
 */

const MutateUser = ({ children, project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { _id } = useSelector((state) => state.user.auth);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (project) {
      const { name, location, startedAt, comment, code } = project;

      reset({
        code,
        name,
        location,
        startedAt,
        comment,
      });
    }
  }, [project]);

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      await dispatch(createUser({ ...formData, password: formData.username }));
      await dispatch(getUsers());

      onClose();
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: onOpen });
    }
    return child;
  });

  const renderError = (name, type = 'required') => {
    if (name in errors && errors[name].type === type) {
      return <ErrorMessage />;
    }
    return null;
  };

  return (
    <>
      {/* Button */}
      {childrenWithProps}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader textAlign='center'>Tài khoản mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Tên người dùng <span className='text-red-500'>*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder='Tên người dùng'
                {...register('username', { required: true })}
              />
              {renderError('username')}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Họ và tên <span className='text-red-500'>*</span>
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder='Họ và tên'
                {...register('fullName', { required: true })}
              />
              {renderError('fullName')}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Quyền hạn <span className='text-red-500'>*</span>
              </FormLabel>
              <Controller
                name='role'
                control={control}
                defaultValue={3}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select {...field}>
                    <option value={1}>Admin</option>
                    <option value={2}>Quản lý</option>
                    <option value={3}>Nhân viên</option>
                  </Select>
                )}
              />
              {renderError('role')}
            </FormControl>

            <Grid
              gridTemplateColumns={{
                base: 'repeat(1,1fr)',
                md: 'repeat(2,1fr)',
              }}
              gridColumnGap='2rem'
            >
              <FormControl mt={4}>
                <FormLabel>
                  Ngày sinh <span className='text-red-500'>*</span>
                </FormLabel>

                <Controller
                  name='DOB'
                  control={control}
                  defaultValue={new Date()}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Datepicker
                      defaultDate={new Date()}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>
                  Chức vụ <span className='text-red-500'>*</span>
                </FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Chức vụ'
                  {...register('jobTitle', { required: true })}
                />
                {renderError('jobTitle')}
              </FormControl>
            </Grid>

            <Grid
              gridTemplateColumns={{
                base: 'repeat(1,1fr)',
                md: 'repeat(2,1fr)',
              }}
              gridColumnGap='2rem'
            >
              <FormControl mt={4}>
                <FormLabel>
                  Email<span className='text-red-500'>*</span>
                </FormLabel>
                <Input
                  ref={initialRef}
                  type='email'
                  placeholder='Email'
                  {...register('email', { required: true })}
                />
                {renderError('email')}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>
                  Số điện thoại<span className='text-red-500'>*</span>
                </FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Số điện thoại'
                  type='tel'
                  {...register('phoneNumber', {
                    required: {
                      value: true,
                      message: 'Vui lòng điện trường này',
                    },
                    // validate: (val) => {
                    //   if (val.match(/\D/g)) {
                    //     return 'Số điện thoại không hợp lệ';
                    //   }
                    //   return false;
                    // },
                    minLength: {
                      value: 10,
                      message: 'Số điện thoại không hợp lệ',
                    },
                    maxLength: {
                      value: 11,
                      message: 'Số điện thoại không hợp lệ',
                    },
                  })}
                />
                {errors?.phoneNumber?.message && (
                  <ErrorMessage msg={errors.phoneNumber.message} />
                )}
              </FormControl>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button
              background='primary'
              color='white'
              type='submit'
              disabled={loading}
            >
              {project ? 'Lưu' : 'Tạo'} tài khoản
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MutateUser;
