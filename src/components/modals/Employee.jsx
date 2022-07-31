import {
  Button,
  FormControl,
  FormLabel,
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
import { useParams } from 'react-router-dom';
import { addMember } from '../../features/project/projectSlice';
import { positions } from '../../utils/constants';

/**
 *
 * @children Pass in the button
 */

const EmployeeModal = ({ children, _id, fullname, userId, role, edit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const { systemUsers } = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const formOnSubmit = async (formData) => {
    setLoading(true);
    await dispatch(addMember({ id, formData }));

    reset();
    setLoading(false);
    onClose();
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: onOpen });
    }
    return child;
  });

  useEffect(() => {
    if (userId && role) {
      reset({ userId, role });
    }

    return () => {
      reset();
    };
  }, [isOpen]);

  return (
    <>
      {/* Button */}
      {childrenWithProps}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(formOnSubmit)}>
          <ModalHeader textAlign='center'>
            {edit ? 'Sửa' : 'Thêm'} thành viên
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!edit && (
              <FormControl>
                <FormLabel>
                  Tài khoản người dùng
                  <span className='text-red-500'> *</span>
                </FormLabel>
                <Controller
                  name='userId'
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value selected hidden>
                        Chọn tài khoản người dùng
                      </option>
                      {systemUsers.map(({ username, _id }) => (
                        <option value={_id}>{username}</option>
                      ))}
                    </Select>
                  )}
                />
                {errors.userId && (
                  <p className='text-red-500 mt-1 text-xs'>
                    Vui lòng chọn tài khoản
                  </p>
                )}
              </FormControl>
            )}

            <FormControl mt={4}>
              <FormLabel>
                Chức vụ <span className='text-red-500'>*</span>
              </FormLabel>

              <Controller
                name='role'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select {...field}>
                    <option value selected hidden>
                      Chọn chức vụ
                    </option>
                    {positions.map(({ full }) => (
                      <option value={full}>{full}</option>
                    ))}
                  </Select>
                )}
              />
              {errors.jobTitle && (
                <p className='text-red-500 mt-1 text-xs'>
                  Vui lòng chọn chức vụ
                </p>
              )}
            </FormControl>
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
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmployeeModal;
